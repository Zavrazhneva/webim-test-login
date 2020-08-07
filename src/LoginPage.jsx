import {Redirect, useHistory, useLocation} from "react-router-dom";
import React, {useState, useEffect } from "react";
import {useAuth} from "./Authcontext";
import cx from 'classnames';
import S from './Login.module.css';
import {TextField, Button} from '@material-ui/core';

export function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();


    let {from} = location.state || {from: {pathname: "/protected"}};
    const [userName, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        if (userName === null) {
            return;
        }
        if (userName.length >= 150 || userName.length < 1) {
            setNoValidUser(true)
        }
        let re = new RegExp("^[\\w.@+-]+$");
        let validUserName = re.test(userName);
        if (validUserName) {
            setNoValidUser(false)
        } else {
            setNoValidUser(true)
            console.log('error')
        }
    },[userName])




    async function getUsers(e) {
        e.preventDefault();
        try {
            await auth.signIn(userName, password);
            history.replace(from);
        } catch (error) {
            console.error(error);
        }
    }

    const [noValid, setNoValidUser] = useState(false);

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }


    if (auth.token) {
        return <Redirect to="/protected"/>
    }

    return (
        <form className={S.form}>
            <TextField error={noValid}  id="outlined-basic" label="Логин:" variant="outlined" type="text" onChange={onChangeUsername}
                       name='username' />
            <TextField id="outlined-basic" label="Пароль:" variant="outlined" type="text" onChange={onChangePassword}
                       name='password'/>
            <Button onClick={getUsers} variant="contained" color="primary" to="/protected">
                Войти
            </Button>
        </form>
    );
}