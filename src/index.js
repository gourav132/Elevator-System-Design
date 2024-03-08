import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RequestProvider } from './Context/RequestContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RequestProvider>
      <App />
    </RequestProvider>
  // </React.StrictMode>
);
