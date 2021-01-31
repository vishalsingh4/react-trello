import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import TaskComponent from "../TaskComponent";

const TaskList = styled.div`
  padding: 0.5rem;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  border-radius: 0.5rem;
`;

const useStyles = makeStyles({
  root: {
    margin: "1rem",
    border: "2px solid #e5e5e5",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem",
    minWidth: "22%",
  },
  title: {
    padding: "0.5rem",
    marginTop: 0,
  },
});

const ColumnComponent = ({
  column: { title = "", id = 0 } = {},
  tasks = [],
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h5" gutterBottom className={classes.title}>
        {title}
      </Typography>
      <Droppable droppableId={id} type="TASK">
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks &&
              tasks.map((task, index) => (
                <TaskComponent key={task.id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default ColumnComponent;
