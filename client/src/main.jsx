import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './redux/store.js';
import { provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <porvider store={store}>
       <App />
  </porvider>
  
  
)
