import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MeuTodoList from './components/MeuTodoList';
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Header />
    <MeuTodoList />
    <Footer />
  </React.StrictMode>
);