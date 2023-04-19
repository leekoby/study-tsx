import React from 'react';
import styled from 'styled-components';
import { Item } from '../types';

interface TodoItemProps {
  todo: Item;
  handleToggle: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TodoItem: React.FunctionComponent<TodoItemProps> = ({ todo, handleToggle, handleDelete }) => {
  const { id, todo: text, isCompleted } = todo;

  return (
    <Li isCompleted={isCompleted} onClick={() => handleToggle(id)}>
      {text}
      <Button onClick={() => handleDelete(id)}>delete</Button>
    </Li>
  );
};

export default TodoItem;

const Li = styled.li<{ isCompleted: boolean }>`
  text-decoration: ${(props) => (props.isCompleted ? 'line-through' : 'none')};
`;

const Button = styled.button`
  margin-left: 8px;
`;
