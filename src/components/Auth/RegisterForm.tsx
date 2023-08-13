'use client'

import { observer } from 'mobx-react-lite';
import { useState, useEffect, FormEvent, FC } from 'react';
import s from './style.module.scss'
import axios from 'axios';
import info from '../../assets/icons/info-circle.svg';
import Image from 'next/image'
import { Roles } from '../../types/Roles';
import AuthStore from '../../store/AuthStore';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^(?!$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


interface RegisterFormProps {
    authStore?: typeof AuthStore
}

const RegisterForm: FC<RegisterFormProps> = ({ authStore }) => {
    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState<string>('')
    const [validPassword, setValidPassword] = useState(false)

    const [roles, setRoles] = useState<Roles>({})

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

    const handleSetRole = (role: Roles) => {
        setRoles(role)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setCheckRun(true)
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2 || isEmpty(roles)) {
            return
        }
        await authStore?.registration(email, password, roles)
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
            <h2 className={s.title}>Регистрация</h2>
            {!isEmpty(authStore?.user) && <p className={s.paragraph}>Регистрация прошла успешно!</p>}
            {authStore?.error && <p className={s.paragraph}>{authStore.error}</p>}

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
            <div className={s.type}>
                <label className={s.label}><input className={s.radio} onChange={() => handleSetRole({"Shipper": 5150})} type="radio" name='type'/>Грузоотправитель</label>
                <label className={s.label}><input className={s.radio} onChange={() => handleSetRole({"Carrier": 2120})} type="radio" name='type'/>Перевозчик</label>
                <p className={isEmpty(roles) && checkRun ? s.instructions : s.offscreen}>
                    <Image src={info} alt="" />Выберите, в качестве кого вас зарегистрировать
                </p>
            </div>
            <button className={s.button}>Регистрация</button>
        </form>
    )
}

export default observer(RegisterForm)