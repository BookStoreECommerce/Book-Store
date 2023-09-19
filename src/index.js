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
import ForgetPasswordStepper from "./Components/Login/forgetPassword/ForgetPasswordStepper";
import AuthLayout from "./Components/layout/AuthLayout";
import Success from "./Components/LoginSocialActions/Success";
import ThemeContextProvider from "./context/theme-context.jsx";
import LoginLayout from "./Components/LoginSocialActions/LoginLayout";
import Failed from "./Components/LoginSocialActions/Failed";
import { UserProfile } from "./Components/UserProfile/UserProfile";
import ErrorBoundry from "./Components/ErrorBoundry/ErrorBoundry";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const token = localStorage.getItem("token");
      if(!token){
        return null
      }
      // const {data} = await 
    },
    element: <Layout />,
    errorElement: <ErrorBoundry />,
    children: [
      { index: true, element: <Home /> },
      { path: '/profile', element: <UserProfile /> },
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
          // console.log(request);
          return null
        },
        children: [
          {
            path: "success/:token",
            element: <Success />
            // http://localhost:3000/auth/login/success/ + creatred token"
          },
          {
            path: "failed",
            element: <Failed />
          }
        ]
    },
    {
      path:"forgotPassword",
      element: <ForgetPasswordStepper />
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
