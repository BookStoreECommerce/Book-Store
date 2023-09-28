
import store from "../Redux/Store";
import { baseUrl } from "../util/util";
import axios from "axios";


const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})

axiosInstance.interceptors.request.use(req => {
    const token = localStorage.getItem('access-token') || store.getState().auth.token;
    req.headers.Authorization = token ? token : "";
    return req
}, async(error) => Promise.reject(error));

let refresh = false;

axiosInstance.interceptors.response.use(res => res, async(error) => {
    const status = error.response.status;
    const errorMSG = error.response.data.error;
    if(status === 403 && (errorMSG === "jwt expired" ||errorMSG === "access denied") && !refresh){
        refresh = true;
        try{
            const response = await axiosInstance.post('auth/refresh', {}, { withCredentials: true });
            if(response.status === 201){
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                return axiosInstance(error.config)
            }
        }catch(error) {
            const status = error.response.status
            if(status === 401 || status === 403 || status === 500){
                localStorage.removeItem("access-token")
            }
        }
    }
    refresh = true;
    return Promise.reject(error)
})

export default axiosInstance;
