// external dependencies
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// app
import App from './App';

// store
import store from './store';

const div = document.createElement('div');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  div
);

document.body.appendChild(div);
