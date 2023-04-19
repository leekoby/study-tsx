import axios from 'axios';
import { Item } from './types';

const API_BASE_URL = 'http://localhost:8000';

export const getTodos = async (): Promise<Item[]> => {
  const response = await axios.get(`${API_BASE_URL}/todos`);
  return response.data;
};

export const createTodo = async (newTodo: Item): Promise<Item> => {
  const response = await axios.post(`${API_BASE_URL}/todos`, newTodo);
  return response.data;
};

export const updateTodo = async (updatedTodo: Item): Promise<Item> => {
  const response = await axios.put(`${API_BASE_URL}/${updatedTodo.id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
