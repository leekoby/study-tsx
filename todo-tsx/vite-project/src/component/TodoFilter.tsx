import React from 'react';

type Props = {
  filter: string;
  handleFilterChange: (filter: string) => void;
};

const TodoFilter: React.FunctionComponent<Props> = ({ filter, handleFilterChange }: Props) => {
  return (
    <div>
      <button onClick={() => handleFilterChange('all')}>All</button>
      <button onClick={() => handleFilterChange('completed')}>Completed</button>
      <button onClick={() => handleFilterChange('uncompleted')}>Uncompleted</button>
    </div>
  );
};

export default TodoFilter;
