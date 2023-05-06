import { useContext } from 'react'
import { Link } from 'react-router-dom'

import s from './style.module.scss'

import { Context } from '../..'
import logo from '../../assets/icons/main_logo.svg'


export const Footer = () => {
    const { store } = useContext(Context)
    return (
        <footer>
            <div className="primary">
                <h2 className={s.footer_title}>Контакты</h2>
                <nav className={s.nav}>
                    <div className={s.routes}>+7 777 777 77 77<br/>+7 7172 56 56 56</div>
                    <div className={s.routes}>г. Астана, ул. Абая, д.100<br/>БЦ “Название”, 7 этаж, офис 777</div>
                    <div className={s.routes}>info@inrail.kz</div>
                    {!store.isAuth && <div className={s.margin}><Link to={'/auth'}><button className='auth'>Войти</button></Link><Link to={'/registration'}><button>Регистрация</button></Link></div>}
                    {store.isAuth && <button onClick={() => store.logout()}>Выйти</button>}
                </nav>
            </div>
        </footer>
    )
}