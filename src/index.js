import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom'
import ColorProvider from './providers/ColorProvider.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ColorProvider>
      <BrowserRouter>
          <App /> 
      </BrowserRouter>
    </ColorProvider>
  </AuthProvider>
);
