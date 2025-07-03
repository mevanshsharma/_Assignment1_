import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="1090387553841-5ofusfi47k21a00p5phd7nbc694cla92.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
