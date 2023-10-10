import { redirect } from "react-router-dom";
import { getUserProfile, signinWithToken } from "../Redux/Slicies/authActions";
import bcryptjs from "bcryptjs"
import store from "../Redux/Store";
import { getAllCategories } from "../Redux/Slicies/favActions";


const getToken = () => {
    const token = localStorage.getItem("access-token");
    return token;
}

export const indexLoader = async () => {
    const token = getToken();
    const isLogedin = store.getState().auth.user !== null;
    if (isLogedin || !token) {
        return null;
    }
    await store.dispatch(getUserProfile())
    await store.dispatch(getAllCategories());
    return null
}

export const authSocialLoginLoader = async ({ request, params }) => {
    const { token } = params;
    const splits = token.split(".");
    const secret = splits.slice(3, splits.length).join(".");
    const isFromBackend = bcryptjs.getRounds(secret) === 15
    if (isFromBackend) {
        return null;
    }
    return redirect('../..')
}

export const loginSocialLoginLoader = async ({ request, params }) => {
    const { token } = params;
    const splits = token.split(".");
    const secret = splits.slice(0, 3).join(".");
    console.log(secret);
    await store.dispatch(signinWithToken(secret)).unwrap();
    const serverToken = store.getState().auth.token;
    if (serverToken !== null) {
        return redirect('/');
    }
    return null;
}