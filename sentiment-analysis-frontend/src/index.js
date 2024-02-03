import React from 'react';
import ReactDOM from 'react-dom/client'; // Change the import here
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '100vh', // 100% of the viewport height
  background: '#292D3E', // Dark background color
  border: '#676E95', // Border color
  text: '#A6ACCD', // Text color
  accent: '#61AFEF', // Accent color
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={rootStyle}>
      <App />
    </div>
  </React.StrictMode>
);

reportWebVitals();


