import { v4 as uuid } from "uuid";

const trello = {
  state: {
    appData: [],
    authTokenLogin: '#262662bbsbsbsb@4%bsssb2344',
  },
  reducers: {
    populateDummyData(state, data) {
      return {
        ...state,
        appData: data,
      };
    },
    addNewTask(state, newTaskId, newTaskInput) {
      const newTask = { id: newTaskId, content: newTaskInput };
      const columnIdToUpdate = "column-1";

      const newState = {
        ...state.appData,
        columns: {
          ...state.appData.columns,
          [columnIdToUpdate]: {
            ...state.appData.columns[columnIdToUpdate],
            taskIds: [
              ...state.appData.columns[columnIdToUpdate].taskIds,
              newTaskId,
            ],
          },
        },
        tasks: {
          ...state.appData.tasks,
          [newTaskId]: newTask,
        },
      };

      return {
        ...state,
        appData: newState,
      };
    },
    reorderSameList(state, start, newTaskIds) {
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state.appData,
        columns: {
          ...state.appData.columns,
          [newColumn.id]: newColumn,
        },
      };
      return {
        ...state,
        appData: newState,
      };
    },
    reorderDifferentList(state, newStart, newFinish) {
      const newState = {
        ...state.appData,
        columns: {
          ...state.appData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      return {
        ...state,
        appData: newState,
      };
    },
  },
  effects: {
    async asyncAddNewTask({ newTaskInput }) {
      const newTaskId = `task-${uuid()}`;
      this.addNewTask(newTaskId, newTaskInput);
    },
    async asyncReorderSameList({ start, source, destination, draggableId }) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      this.reorderSameList(start, newTaskIds);
    },
    async asyncReorderDifferentList({
      start,
      source,
      finish,
      destination,
      draggableId,
    }) {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      this.reorderDifferentList(newStart, newFinish);
    },
  },
};

export default trello;
