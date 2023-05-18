import {createContext, useEffect, useState} from "react";
import axios from "./authAxios";
import {HttpStatusCode} from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [accessToken, setAccessToken] = useState(null);
    const [userState, setUserState] = useState({});
    useEffect(() => {
        axios.post('/v1/auth/refresh').then((response) => {
            if (response.status === HttpStatusCode.Ok) setAccessToken(response.data.access_token)
        }).catch(() => setIsLoading(true))
    }, [])
    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
            axios.get('/v1/auth/get_current_user').then((response) => {
                setUserState({
                    isAuthenticated: true,
                    user: {userId: response.data.user_id, userName: response.data.user_name}
                })
            }).finally(()=>setIsLoading(true))
        } else setUserState({})
    }, [accessToken])
    if (isLoading) return (<AuthContext.Provider value={{accessToken, setAccessToken, userState, setUserState}}>
        {children}
    </AuthContext.Provider>);
};
