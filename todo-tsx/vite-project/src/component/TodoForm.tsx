import React, { useState } from 'react';
import styled from 'styled-components';
interface Props {
  handleCreate: (todo: string) => void;
}
const TodoForm: React.FunctionComponent<Props> = ({ handleCreate }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    handleCreate(input.trim());
    setInput('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder=' Enter here...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button>추가</Button>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px 0 0 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #7159c1;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
`;
export default TodoForm;
