import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.jsx';
import './app/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/AmigosDeLaBibliotecaWebApp'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);
