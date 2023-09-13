import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forgotPassword", element: <ForgotPassword /> },
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


