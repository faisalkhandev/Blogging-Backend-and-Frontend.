import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Profile from './Pages/Profile.jsx';
import PrivateRoutes from './routes/PrivateRoutes.jsx';
import Post from './Pages/Post';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/post',
    element: <Post />,
  },
  {
    path: '/profile',
    element: (
      <PrivateRoutes>
        <Profile />
      </PrivateRoutes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
