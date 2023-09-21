import { getUserProfile } from "../Redux/Slicies/authSlice";
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
    await store.dispatch(getUserProfile()).unwrap()
    return null
}