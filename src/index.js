import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/layout/Layout.jsx';
import Home from './Components/Home/Home.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }
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


