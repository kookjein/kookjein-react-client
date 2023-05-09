import {createContext, useEffect, useState} from "react";
import axios from "./authAxios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [userState, setUserState] = useState({
        accessToken: null,
    });
    useEffect(()=>{
        if (userState.accessToken) axios.defaults.headers.common.Authorization = `Bearer ${userState.accessToken}`
    }, [userState])
    return (<AuthContext.Provider value={{userState, setUserState}}>
        {children}
    </AuthContext.Provider>);
};
