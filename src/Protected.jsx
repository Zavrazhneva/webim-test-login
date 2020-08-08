import React, {useState, useEffect} from "react";
import {useAuth} from "./Authcontext";
import axios from "axios";
import S from './Login.module.css';
import {TextField} from '@material-ui/core';
import {AuthButton} from "./AuthButton";
import cx from 'classnames'


export function Protected() {
    const [users, setUsers] = useState(null);
    const [filterUser, setFilterUser] = useState('');
    let auth = useAuth();
    const token = `Token ${auth.token}`;
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
                headers: {Authorization: token}
            })
            const users = response.data;
            users
                .sort(function (a, b) {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }
                    return 0;
                })
            setUsers(users);
        }
        fetchData();
    }, [token]);

    function renderUsers(users) {
        if (users !== null) {
            return users
                .filter((user) => {
                    return user.username.includes(filterUser)
                })
                .map(user => {
                    return <div className={S.tableRow} key={user.id}>
                        <p className={cx(S.tableTd, S.tableTdId)}>{user.id}</p>
                        <p className={S.tableTd}>{user.username}</p>
                        <p className={S.tableTd}>{user.last_name}</p>
                        <p className={S.tableTd}>{user.first_name}</p>
                    </div>
                })
        }
    }

    function filterUserInput(e) {
        setFilterUser(e.target.value);
    }

    return (
        <div className={S.dataWrapper}>

            <div className={S.headerWrapper}>
                <div className={S.header}>
                    <div className={S.filterWrapper}>
                        <label htmlFor="filter" className={S.filterLabel}>Фильтр</label>
                        <TextField id="standard-size-small" size="small" label="Имя пользователя" variant="outlined"
                                   type="text"
                                   onChange={filterUserInput}
                      />
                    </div>
                    <AuthButton/>
                </div>
            </div>

            <div className={S.tableWrapper}>
                <div className={S.table}>
                    <div className={cx(S.tableRow, S.tableRowTitle)}>
                        <p className={cx(S.tableTd, S.tableTdId)}>ID</p>
                        <p className={S.tableTd}>username</p>
                        <p className={S.tableTd}>last_name</p>
                        <p className={S.tableTd}>first_name</p>
                    </div>
                    {renderUsers(users)}
                </div>
            </div>

        </div>

    )
}
