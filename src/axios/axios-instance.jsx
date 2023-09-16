import { default as axios } from "axios";
import { baseUrl } from "../util/util";

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(res => res, async(error) => {
    // if(error.response.status === "403" && error.response.data.message)
    if(error.response.status === "403"){
            const response = await axiosInstance.post('auth/refresh', {}, { withCredentials: true });
            if(response.status === "201"){
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                return axiosInstance(error.config)
            }
    }

    return error
})

export default axiosInstance;