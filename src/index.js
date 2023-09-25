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
import ThemeContextProvider from "./context/theme-context.jsx";
import ErrorBoundry from "./Components/ErrorBoundry/ErrorBoundry";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { default: Layout } = await import("./Components/layout/Layout");
      const { indexLoader } = await import("./util/loaders");
      return { Component: Layout, loader: indexLoader };
    },
    errorElement: <ErrorBoundry />,
    children: [
      {
        index: true,
        async lazy() {
          const { default: Home } = await import("./Components/Home/Home");
          return { Component: Home };
        },
      },
      {
        path: "userInfo",
        async lazy() {
          const { default: Sidebar } = await import(
            "./Components/Sidebar/Sidebar"
          );
          return { Component: Sidebar };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { default: UserProfile } = await import(
                "./Components/UserProfile/UserProfile"
              );
              return { Component: UserProfile };
            },
          },
          {
            path: "favourites",
            async lazy() {
              const { default: Favourites } = await import(
                "./Components/Favourites/Favourites"
              );
              return { Component: Favourites };
            },
          },
          {
            path: "settings",
            async lazy() {
              const { default: Settings } = await import(
                "./Components/Settings/Settings"
              );
              return { Component: Settings };
            },
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    async lazy() {
      const { default: AuthLayout } = await import(
        "./Components/layout/AuthLayout"
      );
      return { Component: AuthLayout };
    },
    children: [
      {
        path: "login",
        async lazy() {
          const { default: LoginLayout } = await import(
            "./Components/LoginSocialActions/LoginLayout"
          );
          const { authSocialLoginLoader } = await import("./util/loaders");
          return { Component: LoginLayout, loader: authSocialLoginLoader };
        },
        children: [
          {
            path: "success/:token/?",
            async lazy() {
              const { default: Success } = await import(
                "./Components/LoginSocialActions/Success"
              );
              return { Component: Success };
            },
            // http://localhost:3000/auth/login/success/ + creatred token"
          },
          {
            path: "failed/?",
            async lazy() {
              const { default: Failed } = await import(
                "./Components/LoginSocialActions/Failed"
              );
              return { Component: Failed };
            },
          },
        ],
      },
      {
        path: "forgotPassword",
        async lazy() {
          const { default: ForgetPasswordStepper } = await import(
            "./Components/Login/forgetPassword/ForgetPasswordStepper"
          );
          return { Component: ForgetPasswordStepper };
        },
      },
    ],
  },
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

// {
//   path: '/profile',
//   async lazy() {
//     const { default:UserProfile } = await import('./Components/UserProfile/UserProfile');
//     return { Component: UserProfile }
//   }
// },
