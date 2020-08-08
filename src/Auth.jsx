import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";
import {LoginPage} from "./LoginPage";
import {ProvideAuth} from "./Authcontext";
import {Protected} from "./Protected";
import S from './Login.module.css';

export default function AuthExample() {
    return (
        <ProvideAuth>
            <Router>
                <div className={S.content}>
                    <Switch>
                        <Route exact path="/">
                            <LoginPage />
                        </Route>
                        <PrivateRoute path="/protected">
                            <Protected />
                        </PrivateRoute>
                        <PrivateRoute path="*">
                            <Redirect to="/protected" />
                        </PrivateRoute>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}



