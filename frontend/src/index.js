import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // On importe le "courant"
import App from './App';
import './App.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter> 
        {/* En mettant le Router ici, le Header et la Home y ont accès ! */}
        <App />
    </BrowserRouter>
  </React.StrictMode>
);