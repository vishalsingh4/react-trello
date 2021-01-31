import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { selectAppData } from "../../selectors";

import mockData from "../../mockData";

import ColumnComponent from "../ColumnComponent";
import AddTaskModal from "../AddTaskModal";

const useStyles = (props) =>
  makeStyles({
    root: {
      filter: props.showAddModal ? "blur(1px)" : "none",
      pointerEvents: props.showAddModal ? "none" : "auto",
    },
    container: {
      display: "flex",
      justifyContent: "space-evenly",
      position: "relative",
      top: "4rem",
    },
    addBtn: {
      width: "12rem",
      height: "3rem",
      borderRadius: "1rem",
      marginLeft: "9rem",
    },
  });

const MainComponent = () => {
  const [source, setSource] = useState({});
  const [destination, setDestination] = useState({});
  const [start, setStart] = useState({});
  const [finish, setFinish] = useState({});
  const [draggableId, setDraggableId] = useState("");
  const [itemDropped, setItemDropped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState("");

  const appData = useSelector(selectAppData, shallowEqual);

  const dispatch = useDispatch();

  const classes = useStyles({ showAddModal })();

  useEffect(() => {
    //populate mock data on load
    dispatch.trello.populateDummyData(mockData);
  }, [dispatch.trello]);

  useLayoutEffect(() => {
    if (itemDropped) {
      // Move inside same list
      if (start === finish) {
        dispatch.trello.asyncReorderSameList({
          start,
          source,
          destination,
          draggableId,
        });
        return;
      }

      dispatch.trello.asyncReorderDifferentList({
        start,
        source,
        finish,
        destination,
        draggableId,
      });
    }

    // cleanup function
    return () => {
      setItemDropped(false);
    };
  }, [
    source,
    destination,
    start,
    finish,
    draggableId,
    appData,
    itemDropped,
    dispatch.trello,
  ]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setSource(source);
    setDestination(destination);
    setDraggableId(draggableId);
    setStart(appData.columns[source.droppableId]);
    setFinish(appData.columns[destination.droppableId]);
    setItemDropped(true);
  };

  const modalClose = () => {
    setShowAddModal(false);
  };

  const addTask = () => {
    setShowAddModal(true);
  };

  const handleInputChange = (e) => {
    setNewTaskInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch.trello.asyncAddNewTask({ newTaskInput });
    setShowAddModal(false);
  };

  return (
    <Fragment>
      {showAddModal && (
        <AddTaskModal
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleClose={modalClose}
        />
      )}
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.addBtn}
          onClick={addTask}
        >
          Add Task
        </Button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Container className={classes.container}>
            {appData &&
              appData.columnOrder &&
              appData.columnOrder.map((columnId) => {
                const column = appData.columns[columnId];
                const tasks =
                  column &&
                  column.taskIds &&
                  column.taskIds.map((taskId) => appData.tasks[taskId]);

                return (
                  <ColumnComponent
                    key={column.id}
                    column={column}
                    tasks={tasks}
                  />
                );
              })}
          </Container>
        </DragDropContext>
      </div>
    </Fragment>
  );
};

export default MainComponent;
