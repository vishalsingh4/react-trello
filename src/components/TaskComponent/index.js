import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDragging ? "skyblue" : "black")};

  &:last-child {
    margin-bottom: 0;
  }
`;

const TaskComponent = ({ index = 0, task: { id = 0, content = "" } = {} }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {content}
        </Container>
      )}
    </Draggable>
  );
};

export default TaskComponent;
