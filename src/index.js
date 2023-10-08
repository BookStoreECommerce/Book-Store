import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { RouterProvider, createBrowserRouter, } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import ThemeContextProvider from "./Contexts/theme-context";
import ErrorBoundry from "./pages/ErrorBoundry/ErrorBoundry";
import Loading from "./Components/ReusableComponents/Loading/Loading";
import App from './App.js'

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { default: Layout } = await import("./Layouts/Layout");
      const { indexLoader } = await import("./util/loaders");
      return { Component: Layout, loader: indexLoader };
    },
    errorElement: <ErrorBoundry />,
    children: [
      {
        index: true,
        async lazy() {
          const { default: Home } = await import("./pages/Home/Home");
          return { Component: Home };
        },
      },
      {
        path: 'book',
        async lazy() {
          const { default: Books } = await import("./pages/Books/Books");
          return { Component: Books };
        },
      },
      {
        path: "userInfo",
        async lazy() {
          const { default: UserInfo } = await import(
            "./pages/UserInfo/UserInfo"
          );
          return { Component: UserInfo };
        },
        children: [
          {
            index: true,
            async lazy() {
              const { default: UserProfile } = await import(
                "./Components/UserInfoComponents/UserProfile/UserProfile"
              );
              return { Component: UserProfile };
            },
          },
          {
            path: "favourites",
            async lazy() {
              const { default: Favourites } = await import(
                "./Components/UserInfoComponents/Favourites/Favourites"
              );
              return { Component: Favourites };
            },
          },
          {
            path: "settings",
            async lazy() {
              const { default: Settings } = await import(
                "./Components/UserInfoComponents/Settings/Settings"
              );
              return { Component: Settings };
            },
          },
        ],
      },
      {
        path: "Categories",
        async lazy() {
          const { default: Categories } = await import(
            "./pages/Categories/Categories"
          );
          return { Component: Categories };
        },
      },
      {
        path: "books/:slug",
        async lazy() {
          const { default: CategoriesBook } = await import(
            "./pages/CategoriesBook/CategoriesBook"
          );
          return { Component: CategoriesBook };
        },
      },
    ],
  },
  {
    path: "auth",
    async lazy() {
      const { default: AuthLayout } = await import(
        "./Layouts/AuthLayout"
      );
      return { Component: AuthLayout };
    },
    children: [
      {
        path: "login",
        async lazy() {
          const { default: LoginLayout } = await import(
            "./Layouts/SocialLayout"
          );
          const { authSocialLoginLoader } = await import("./util/loaders");
          return { Component: LoginLayout, loader: authSocialLoginLoader };
        },
        children: [
          {
            path: "success/:token",
            async lazy() {
              const { default: Success } = await import(
                "./pages/SocialLogin/Success"
              );
              const { loginSocialLoginLoader } = await import("./util/loaders");
              return { Component: Success, loader: loginSocialLoginLoader };
            },
          },
          {
            path: "failed/?",
            async lazy() {
              const { default: Failed } = await import(
                "./pages/SocialLogin/Failed"
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
            "./pages/ForgetPassword/ForgetPasswordStepper"
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
      <RouterProvider router={router} fallbackElement={<Loading />}>
        <App />
      </RouterProvider>
    </ThemeContextProvider>
  </Provider>
);
