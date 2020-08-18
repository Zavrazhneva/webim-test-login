import {Redirect, useHistory, useLocation} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {useAuth} from "./Authcontext";
import S from './Login.module.css';
import {TextField, Button} from '@material-ui/core';

export function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    console.log(location);
    let auth = useAuth();


    let { from } = location.state || {from: {pathname: "/protected"}};
    const [userName, setUsername] = useState('test_super');
    const [password, setPassword] = useState('Nf<U4f<rDbtDxAPn');
    const [error, setError] = useState(null);
    const [noValid, setNoValidUser] = useState(false);

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
        }
    }, [userName])

    async function login(e) {
        e.preventDefault();
        try {
            await auth.signIn(userName, password);
            history.replace(from);
        } catch (error) {
            setError(error.response.data.non_field_errors[0]);
            setPassword('');
        }
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setError(null)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setError(null)
    }

    if (auth.token) {
        return <Redirect to="/protected"/>
    }
    return (
        <div className={S.formWrapper}>
            <form className={S.form}>
                <TextField error={noValid} label="Логин:" variant="outlined" type="text"
                           onChange={onChangeUsername} value={userName}
                           name='username'/>
                <TextField value={password} label="Пароль:" variant="outlined" type="password"
                           onChange={onChangePassword}
                           name='password'/>
                {error && <span className={S.errorText}>{error}</span>}
                <Button disabled={noValid || !password.length || !userName.length} onClick={login} variant="contained" color="primary" to="/protected">
                    Войти
                </Button>
            </form>
        </div>
    );
}