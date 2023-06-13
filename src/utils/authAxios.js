import Axios, {HttpStatusCode} from "axios";
import {apiUrl, localApiUrl} from "./config";
import {useContext, useEffect} from "react";
import {AuthContext} from "./authContext";

const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? localApiUrl : apiUrl,
});

axios.defaults.withCredentials = true;

export const AxiosInterceptor = ({children}) => {
    const {setAccessToken} = useContext(AuthContext);
    useEffect(() => {
        const resInterceptor = (response) => {
            return response;
        };
        const errInterceptor = (error) => {
            if (error.response.status === HttpStatusCode.Unauthorized && error.config.url !== '/v1/auth/refresh') {
                return axios.post(`/v1/auth/refresh`).then((response) => {
                    if (response.status === HttpStatusCode.Ok) {
                        setAccessToken(response.data.access_token)
                        error.config.headers.Authorization = `Bearer ${response.data.access_token}`
                        return axios.request(error.config).then(response => {
                            return response
                        })
                    }
                })
            }
            return Promise.reject(error);
        };
        const interceptor = axios.interceptors.response.use(resInterceptor, errInterceptor);
        return () => axios.interceptors.response.eject(interceptor);
    }, [setAccessToken]);
    return children
}

export default axios;
