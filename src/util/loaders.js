import { redirect } from "react-router-dom";
import {
  getSearchedBooks,
  getSuggestedBooks,
  getUserProfile,
  signinWithToken,
} from "../Redux/Slicies/authActions";
import bcryptjs from "bcryptjs";
import store from "../Redux/Store";
import { getAllCategories } from "../Redux/Slicies/favActions";
import { getNewBooks } from "../Redux/Slicies/bookActions";
import { createCart, getCart } from "../Redux/Slicies/cartAction.js";
import { getCartWithoutToken } from "../Redux/Slicies/cartSlice.js";

const getToken = () => {
  const token = localStorage.getItem("access-token");
  return token;
};

export const indexLoader = async () => {
  // export const indexLoader = async () => {
  const token = getToken();
  await store.dispatch(getAllCategories());
  await store.dispatch(getNewBooks());
  const isLogedin = store.getState().auth.user !== null;
  if (!token) {
    // if (isLogedin || !token) {
    store.dispatch(getCartWithoutToken());
    return null;
  }
  localStorage.getItem("cartDetails")
    ? await store.dispatch(
        createCart(JSON.parse(localStorage.getItem("cartDetails")))
      )
    : store.dispatch(getCart());
  await store.dispatch(getUserProfile());
  await store.dispatch(getSearchedBooks());
  await store.dispatch(getSuggestedBooks());
  return null;
};

export const authSocialLoginLoader = async ({ request, params }) => {
  const { token } = params;
  const splits = token.split(".");
  const secret = splits.slice(3, splits.length).join(".");
  const isFromBackend = bcryptjs.getRounds(secret) === 15;
  if (isFromBackend) {
    return null;
  }
  return redirect("../..");
};

export const loginSocialLoginLoader = async ({ request, params }) => {
  const { token } = params;
  const splits = token.split(".");
  const secret = splits.slice(0, 3).join(".");
  await store.dispatch(signinWithToken(secret)).unwrap();
  const serverToken = store.getState().auth.token;
  if (serverToken !== null) {
    return redirect("/");
  }
  return null;
};
