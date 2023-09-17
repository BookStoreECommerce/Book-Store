import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";


import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";

import Layout from "./Components/layout/Layout";
import AuthLayout from "./Components/layout/AuthLayout";
import Success from "./Components/LoginSocialActions/Success";
import ThemeContextProvider from "./context/theme-context.jsx";
import LoginLayout from "./Components/LoginSocialActions/LoginLayout";
import Failed from "./Components/LoginSocialActions/Failed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
  ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children:[
      {
        path: "login",
        element: <LoginLayout />,
        loader:({request, params}) => {
          console.log(request);
        },
        children: [
          {
            path: "success/:token",
            element: <Success />
          },
          {
            path: "failed",
            element: <Failed />
          }
        ]
    }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ThemeContextProvider>
  </Provider>
);
