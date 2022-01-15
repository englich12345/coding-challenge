import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux'
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_REACT_API_URL;

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root')
);
