import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import s from './style.module.scss'
import { Context } from '../..';

const LoginForm = ({ type }: { type?: string }) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)

    const location = useLocation()
    return (
        <div className={s.form}>
            {location.pathname === '/auth' ? <h2 className={s.title}>Авторизация</h2> : <h2 className={s.title}>Регистрация</h2>}
            <div className={s.form_content}>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="Логин"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                />
                {location.pathname === '/auth' ? <><button className={s.button} onClick={() => store.login(email, password)}>Войти в кабинет</button><div className={s.forgot}>Забыли пароль?</div></>:
                <button className={s.button} onClick={() => store.registration(email, password)}>Регистрация</button>}
            </div>
        </div>
    )
}

export default observer(LoginForm)