import {useHistory} from "react-router-dom";
import React from "react";
import {useAuth} from "./Authcontext";
import {Button} from '@material-ui/core';
import S from './Login.module.css'

export function AuthButton() {
    let history = useHistory();
    let auth = useAuth();

    return (
        <Button onClick={() => {
            auth.signOut(() => history.push("/"));
            localStorage.clear();
        }} variant="contained" color="primary" to="/protected" className={S.signout}>
            Выйти
        </Button>

    )
}
