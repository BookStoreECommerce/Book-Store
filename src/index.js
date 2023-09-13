import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiInputBase:{
      styleOverrides:{
        root:{
          backgroundColor: '#faf5f5',
        },
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root:{
          "&.Mui-focused": {
            color: '#ce7777',
        },
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            // WebkitBoxShadow: '0 0 0 100px transparent inset',
            // WebkitTextFillColor: '#fff'
          },
          ':hover': {
            borderColor: '#e8c4c4 !important'
          },
        },
        root: {
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline" : {
            borderColor: '#e8c4c4 !important'
          },
          }
        },
      },
    },
    
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ThemeProvider>

    {/* <RouterProvider router={router}>
      <App />
    </RouterProvider> */}
    
  </Provider>
);
