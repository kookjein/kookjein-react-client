import {createContext, useEffect, useState} from "react";
import axios from "./authAxios";
import {HttpStatusCode} from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [userState, setUserState] = useState({});
    useEffect(() => {
        axios.post('/v1/auth/refresh').then((response) => {
            if (response.status === HttpStatusCode.Ok) setUserState({accessToken: response.data.access_token})
        })
    }, [])
    useEffect(() => {
        if (userState.accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${userState.accessToken}`
            if (!userState.isAuthenticated) {
                axios.get('/v1/auth/get_current_user').then((response) => {
                    setUserState({...userState, isAuthenticated: true, user: {userName: response.data.user_name}})
                })
            }
        }
    }, [userState])
    return (<AuthContext.Provider value={{userState, setUserState}}>
        {children}
    </AuthContext.Provider>);
};
