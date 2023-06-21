import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {localWsUrl, wsUrl} from "./config";
import {AuthContext} from "./authContext";

export const WebsocketContext = createContext(null);

export const WebsocketProvider = ({children}) => {
    const [isInitialized, setIsInitialized] = useState(false)
    const {accessTokenRef} = useContext(AuthContext)
    const wsRef = useRef(null)

    const connect = useCallback(() => {
        return new Promise((resolve, reject) => {
            if (wsRef.current) {
                resolve()
                return
            }
            wsRef.current = new WebSocket(`${process.env.NODE_ENV === 'development' ? localWsUrl : wsUrl}/v1/ws`)
            wsRef.current.onopen = () => {
                wsRef.current.send(accessTokenRef.current)
                resolve()
                console.log('ws opened')
            }
            wsRef.current.onclose = () => {
                wsRef.current = null
                console.log('ws closed')
                setTimeout(connect, 10000)
            }
        })
    }, [])

    useEffect(() => {
        connect().then(() => setIsInitialized(true))
        return () => {
            wsRef.current.close()
        }
    }, [connect])

    return isInitialized && <WebsocketContext.Provider value={{wsRef}}>
        {children}
    </WebsocketContext.Provider>;
};
