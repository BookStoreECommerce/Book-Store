import { redirect } from "react-router-dom";
import { getUserProfile } from "../Redux/Slicies/authActions";
import store from "../Redux/Store";


const getToken = () => {
    const token = localStorage.getItem("access-token");
    return token;
}

export const indexLoader = async() => {
    const token = getToken();
    const isLogedin = store.getState().auth.user !== null;
    if(isLogedin || !token){
        return null;
    }
    await store.dispatch(getUserProfile())
    return null
}

export const authSocialLoginLoader = async({ request, params }) => {
    const { token } = params;
    const allow = new URL(request.url).searchParams.get("allow");
    if (token) {
      return null;
    }
    return redirect('../..')
  }