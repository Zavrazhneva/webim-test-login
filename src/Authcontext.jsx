import React, {createContext, useContext, useState} from "react";
import {authServer} from "./AuthServer";


function useProvideAuth() {
    const [token, setToken] = useState(authServer.token);

    const signIn = async (username, password) => {
        await authServer.signIn(username, password);
        setToken(authServer.token);
    }
    const signOut = async () => {
        await authServer.signOut();
        setToken(null);
    }

    return {
        token,
        signIn,
        signOut
    };
}

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}