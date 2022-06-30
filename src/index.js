import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MeuTodoList from './MeuTodoList';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MeuTodoList />
  </React.StrictMode>
);