import styled from 'styled-components';
import { Item } from '../types';

interface TodoItemProps {
  todo: Item;
  handleToggle: (id: number) => void;
}

function TodoItem({ todo, handleToggle }: TodoItemProps) {
  const handleDelete = () => {};

  return (
    <ListDiv>
      <li
        key={todo.id}
        onClick={() => {
          handleToggle(todo.id);
        }}
        style={{ textDecoration: todo.complete ? 'line-through' : 'none' }}>
        {todo.text}
      </li>
      <button onClick={handleDelete}>X</button>
    </ListDiv>
  );
}
export default TodoItem;

const ListDiv = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;

  > li {
    list-style: decimal;
    margin-right: 20px;
  }
  > button {
    height: 40px;
    width: 40px;
  }
`;
