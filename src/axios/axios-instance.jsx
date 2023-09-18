import { default as axios } from "axios";
import { baseUrl } from "../util/util";
import { redirect } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    // headers:{
    //     'Authorization': 
    // }
})

axiosInstance.interceptors.response.use(res => res, async(error) => {
    // if(error.response.status === "403" && error.response.data.message)
    if(error.response.status === "403" && (error.response.data.message === "jwt expired" || error.response.data.message === "access denied")){
            const response = await axiosInstance.post('auth/refresh', {}, { withCredentials: true });
            if(response.status === "201"){
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                return axiosInstance(error.config)
            }
            if(response.status === "401" || response.status === "403"){
                //=> show a tost with this message "login timed out, please login again."
            }
    }
    
    return Promise.reject(error)
})

export default axiosInstance;