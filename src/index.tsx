import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Character from './routes/Characters'
import Comics from './routes/Comics';
import Creators from './routes/Creators';
import reportWebVitals from './reportWebVitals';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/characters',
        element: <Character />
      },
      {
        path: '/comics',
        element: <Comics />
      },
      {
        path: '/creators',
        element: <Creators />
      }
    ]
  },

])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
