import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Layout from "./Components/layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import {Register} from "./Components/Register/Register.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import { createTheme, ThemeProvider } from "@mui/material";

import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";
import Layout from "./Components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {path : 'register' , element : <Register/> }
  ],
  },
]);


// const theme = createTheme({

// })


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={theme}> */}
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    {/* </ThemeProvider> */}
  </Provider>
);
