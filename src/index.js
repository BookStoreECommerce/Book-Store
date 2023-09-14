import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import VerifyPassword from './Components/Login/VerifyPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forgotPassword", element: <ForgotPassword /> },
      { path: "/verifyPassword", element: <VerifyPassword /> },
      { path: "/resetPassword", element: <ResetPassword /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);


