import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import ThemeContextProvider from "./Contexts/theme-context.jsx";
import Layout from "./Layouts/Layout";
import ErrorBoundry from "./pages/ErrorBoundry/ErrorBoundry";
import Home from "./pages/Home/Home";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import AuthLayout from "./Layouts/AuthLayout";
import SocialLayout from "./Layouts/SocialLayout";
import Success from "./pages/SocialLogin/Success";
import Failed from "./pages/SocialLogin/Failed";
import ForgetPasswordStepper from "./pages/ForgetPassword/ForgetPasswordStepper";


const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
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
    children: [
      {
        path: "login",
        element: <SocialLayout />,
        loader: ({ request, params }) => {
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
        path: "forgotPassword",
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
