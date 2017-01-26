import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import EventEmitter from 'wolfy87-eventemitter';
import './index.css';
import './icons/crud.css'

// This module holds EventEmitter object 
// and renders React first time

// It does NOT know anything about data, logic or structure

window.ee = new EventEmitter();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

