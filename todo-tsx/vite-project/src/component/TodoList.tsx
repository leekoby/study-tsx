import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Item } from '../types';
import TodoFilter from './TodoFilter';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';

export const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos] = useState<Item[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const fetchTodo = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    async function fetchTodos() {
      const todos = await getTodos();
      setTodos(todos);
      setFilteredTodos(todos);
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      if (filter === 'all') {
        return true;
      } else if (filter === 'active') {
        return !todo.isCompleted;
      } else if (filter === 'completed') {
        return todo.isCompleted;
      }
    });
    setFilteredTodos(filtered);
  }, [todos, filter]);

  const handleCreate = async (todoText: string) => {
    const newTodo: Item = await createTodo({
      id: Date.now(),
      todo: todoText,
      isCompleted: false,
      userId: 1,
    });
    const createdTodo = await createTodo(newTodo);
    setTodos([...todos, createdTodo]);
  };

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo))
    );
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todos) => todos.id !== id));
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <TodoForm handleCreate={handleCreate} />
      <TodoFilter filter={filter} handleFilterChange={setFilter} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;
