import Link from 'next/link'

import s from './style.module.scss'

import logo from '../../assets/icons/main_logo.svg'
import { inject, observer } from 'mobx-react'
import AuthStore from '../../store/AuthStore'
import { FC } from 'react'

interface FooterProps {
    authStore?: typeof AuthStore
}

const Footer: FC<FooterProps> = ({ authStore }) => {
    return (
        <footer className={s.footer}>
            <div className="primary">
                <h2 className={s.footer_title}>Контакты</h2>
                <nav className={s.nav}>
                    <div className={s.routes}>+7 777 777 77 77<br/>+7 7172 56 56 56</div>
                    <div className={s.routes}>г. Астана, ул. Абая, д.100<br/>БЦ “Название”, 7 этаж, офис 777</div>
                    <div className={s.routes}>info@inrail.kz</div>
                    {!authStore?.isAuth && <div className={s.margin}><Link href='/auth'><button className='auth'>Войти</button></Link><Link href='/registration'><button>Регистрация</button></Link></div>}
                    {authStore?.isAuth && <button onClick={() => authStore.logout()}>Выйти</button>}
                </nav>
            </div>
        </footer>
    )
}

export default inject('authStore')(observer(Footer))