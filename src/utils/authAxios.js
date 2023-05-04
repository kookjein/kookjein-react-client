import Axios, {HttpStatusCode} from "axios";
import {apiUrl} from "./config";
import {useEffect} from "react";

const axios = Axios.create({
    baseURL: apiUrl
});

axios.defaults.withCredentials = true;

function AxiosInterceptor({children, accessToken}) {
    useEffect(() => {
        const resInterceptor = (response) => {
            return response;
        };
        const errInterceptor = (error) => {
            if (error.response.status === HttpStatusCode.BadRequest && error.config.url !== '/v1/auth/refresh') {
                return axios.post(`/v1/auth/refresh`).then((response) => {
                    if (response.status === HttpStatusCode.Ok) {
                        accessToken.current = response.data.access_token
                        axios.defaults.headers.common.Authorization = `Bearer ${accessToken.current}`
                        //TODO Retry prev API call (error)
                    }
                })
            } else if (error.response.status === HttpStatusCode.BadRequest) return error
            return Promise.reject(error);
        };
        const interceptor = axios.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );
        return () => axios.interceptors.response.eject(interceptor);
    }, [accessToken]);
    return children
}

export default axios;
export {AxiosInterceptor};
