import { fetchTodo } from '@/store/storeSlice';
import React from 'react';

const page = async () => {
  const fetchTodo = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await res.json();
    return data;
  };
  const data = await fetchTodo();
  console.log(data);
  return <div>page</div>;
};

export default page;
