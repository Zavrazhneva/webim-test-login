import {Redirect, Route} from "react-router-dom";
import React from "react";
import { useAuth} from "./Authcontext"
export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (auth.token) {
                    return  children
                }
                console.log(location);
                return (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    );
}