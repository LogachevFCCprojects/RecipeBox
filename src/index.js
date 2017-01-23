import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import EventEmitter from 'wolfy87-eventemitter';


window.ee = new EventEmitter();

Array.prototype.clone = function () {
        let arr = this.slice(0), i;
        for (i = 0; i < this.length; i += 1) {
            if (this[i].clone) {
                arr[i] = this[i].clone();
            }
        }
        return arr;
    };

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

