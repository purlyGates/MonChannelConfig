// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css'; // Import the main styles

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(<App />);
} else {
  console.error('Root element with id "root" not found in the document.');
}
