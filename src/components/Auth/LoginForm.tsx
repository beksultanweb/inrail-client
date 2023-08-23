'use client'

import { observer, inject } from 'mobx-react';
import { useState, useEffect, FormEvent, FC } from 'react';
import s from './style.module.scss'
import { isAxiosError } from 'axios';
import info from '../../assets/icons/info-circle.svg';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import AuthStore from '../../store/AuthStore';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^(?!$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


interface LoginFormProps {
    authStore?: typeof AuthStore
}

const LoginForm: FC<LoginFormProps> = ({ authStore }) => {
    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState<string>('')
    const [validPassword, setValidPassword] = useState(false)

    const [checkRun, setCheckRun] = useState(false)

    const handleEmailInput = (email: string) => {
        setEmail(email)
    }

    const handlePasswordInput = (password: string) => {
        setPassword(password)
    }

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
        setCheckRun(false)
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setCheckRun(false)
    }, [password])


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setCheckRun(true)
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2) {
            return
        }
        await authStore?.login(email, password)
        router.push('/requests')
    }

    const isEmpty = (obj: Object | undefined) => {
        for (const prop in obj) {
          if (Object.hasOwn(obj, prop)) {
            return false;
          }
        }
        return true;
      }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <h2 className={s.title}>Авторизация</h2>
            {!isEmpty(authStore?.user) && <p className={s.paragraph}>Пользователь авторизован!</p>}
            {authStore?.error && <p className={s.paragraph}>{authStore?.error}</p>}

            <input
                onChange={e => handleEmailInput(e.target.value)}
                value={email}
                type="text"
                className={s.input}
                placeholder="Логин"
            />
            <p className={!email && checkRun ? s.instructions : s.offscreen}>
                    <Image src={info} alt="" />Email обязателен к заполнению
            </p>
            <p id="emailnote" className={`${email && !validEmail && checkRun ? s.instructions : s.offscreen}`}>
                <Image src={info} alt="" />Email должен содержать латинские буквы, @ и точку.
            </p>
            <input
                onChange={e => handlePasswordInput(e.target.value)}
                value={password}
                type="password"
                className={s.input}
                placeholder="Пароль"
            />
            <p className={!password && checkRun ? s.instructions : s.offscreen}>
                    <Image src={info} alt="" />Пароль обязателен к заполнению
            </p>
            <p id="pwdnote" className={password && !validPassword && checkRun ? s.instructions : s.offscreen}>
                <Image src={info} alt="" />Пароль должен содержать от 8 до 24 символов.<br/>
                Хотябы одну букву верхнего регистра,<br/>
                одну цифру и один спец.символ.
            </p>
            <button className={s.button}>Войти в кабинет</button>
            <div className={s.forgot}>Забыли пароль?</div>
        </form>
    )
}

export default inject('authStore')(observer(LoginForm))