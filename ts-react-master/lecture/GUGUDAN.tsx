import * as React from 'react';
import { useState, useRef } from 'react';

const createRandomNumber = () => {
  return Math.ceil(Math.random() * 9);
};

const GUGUDAN = () => {
  const [first, setFirst] = useState(createRandomNumber);
  const [second, setSecond] = useState(createRandomNumber);
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (parseInt(value) === first * second) {
      setResult('정답');
      setFirst(createRandomNumber);
      setSecond(createRandomNumber);
      setValue('');
      if (input) {
        input.focus();
      }
    } else {
      setResult('땡');
      setValue('');
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <>
      <div>
        {first} 곱하기 {second} 는?
        <form onSubmit={onSubmitForm}>
          <input
            ref={inputRef}
            type='number'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
        <div>{result}</div>
      </div>
    </>
  );
};
export default GUGUDAN;
