import React from 'react';
// 1. Change the import to 'react-dom/client'
import ReactDOM from 'react-dom/client'; 
import EmployeeList from './EmployeeList.jsx';

// 2. Create a root by passing the DOM element
const root = ReactDOM.createRoot(document.getElementById('content'));

// 3. Use root.render() to render your component
root.render(
  <React.StrictMode>
    <EmployeeList />
  </React.StrictMode>
);