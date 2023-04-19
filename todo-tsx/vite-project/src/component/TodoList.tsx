import React, { useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { Item } from '../types';

export const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: 'todo 만들기', complete: false },
    { id: 2, text: 'jsx 만들기', complete: false },
    { id: 3, text: 'preproject 만들기', complete: false },
  ]);

  const [input, setInput] = useState<string>('');
  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      })
    );
  };
  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, complete: false };
    setTodos([...todos, newTodo]);
  };
  return (
    <DIV>
      <h1> TodoList</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItem todo={todo} handleToggle={handleToggle} />
        ))}
      </ul>
      <Input
        type='text'
        placeholder='Add Todo'
        onChange={(e) => {
          setInput(e.currentTarget.value);
        }}
      />
      <Button onClick={handleClick}>Add</Button>
    </DIV>
  );
};

const DIV = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > ul {
    font-size: 24px;
  }
`;

const Input = styled.input`
  height: 30px;
  width: 50%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-left: 10px;
  margin-top: 40px;
`;

const Button = styled.button`
  height: 30px;
  width: 30%;
  background-color: #1b0fff;
  color: white;
  font-size: 1.3rem;
  margin-top: 10px;
  cursor: pointer;
`;
