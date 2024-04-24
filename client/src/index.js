import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

//redux store
import store from './components/Exam Platform and Leaderboard/redux/store.js';
import { Provider } from 'react-redux';

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
