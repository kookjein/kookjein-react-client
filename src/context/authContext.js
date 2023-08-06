import {createContext, useCallback, useEffect, useRef, useState} from "react";
import axios from "../utils/authAxios";
import {HttpStatusCode} from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userState, setUserState] = useState({});
    const accessTokenRef = useRef(null)
    const updateAccessToken = useCallback((newToken) => {
        return new Promise((resolve) => {
            if (newToken) {
                accessTokenRef.current = newToken
                axios.defaults.headers.common.Authorization = `Bearer ${newToken}`
                return axios.get('/v1/auth/get_current_user').then((response) => {
                    setUserState({
                        isAuthenticated: true, user: {
                            userId: response.data.user_id,
                            userName: response.data.user_name,
                            userType: response.data.user_type,
                            userImage: response.data.user_img,
                            userLanguage: response.data.user_language,
                        }
                    })
                    resolve(newToken)
                })
            } else {
                delete axios.defaults.headers.common.Authorization
                accessTokenRef.current = null
                setUserState({})
                resolve(newToken)
            }
        });
    }, []);
    useEffect(() => {
        axios.post('/v1/auth/refresh').then((response) => {
            if (response.status === HttpStatusCode.Ok) return updateAccessToken(response.data.access_token).then()
        }).finally(() => setIsLoading(true))
    }, [updateAccessToken])
    if (isLoading) return (<AuthContext.Provider value={{userState, accessTokenRef, updateAccessToken}}>
        {children}
    </AuthContext.Provider>);

};
