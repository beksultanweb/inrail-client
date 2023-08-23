import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import s from './style.module.scss'
import { usePathname } from 'next/navigation'

import Image from 'next/image'

import logo from '../../assets/images/Logo_inrail.png'
import AuthStore from '../../store/AuthStore'
import { FC, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'


interface HeaderProps {
  authStore?: typeof AuthStore
}

const Header: FC<HeaderProps> = ({ authStore }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const handleMenuOpen = () => {
      setIsOpen(!isOpen)
    }
    return (
      <RemoveScroll enabled={isOpen}>
       <header className={`${s.header} ${pathname === '/' ? s.header_absolute : ''}`}>
          <div className='primary'>
            <nav className={s.nav}>
                <Link href='/'>
                <Image className={s.logo} src={logo} alt='logo' priority={true}/>
                </Link>
                <div className={`${s.routes} ${s.mobile}`}>Грузоотправителям</div>
                <div className={`${s.routes} ${s.mobile}`}>Перевозчикам</div>
                <Link href='/prices' className={`${s.routes} ${s.mobile}`}>Тарифы</Link>
                <Link href='/about' className={`${s.routes} ${s.mobile}`}>О компании</Link>
                {!authStore?.isAuth && <div className={`${s.margin} ${s.mobile}`}><Link href='/auth'><button className='auth'>Войти</button></Link><Link href='/registration'><button>Регистрация</button></Link></div>}
                {authStore?.isAuth && <div className={`${s.margin} ${s.mobile}`}><Link href='/requests' className={s.routes}>Кабинет</Link><button onClick={() => authStore.logout()}>Выйти</button></div>}
              {/* {users.map(user =>
                <div key={user.email}>{user.email}</div>)} */}
                {/* <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте': 'Подтвердите'}</h1> */}
                <div onClick={handleMenuOpen} className={`${isOpen ? s.mobile__burger_open : s.mobile__burger}`}>
                  <span></span>
                </div>
                <div className={`${isOpen ? s.mobile__menu_open : ''} ${s.mobile__menu}`}>
                  <div onClick={handleMenuOpen} className={s.routes}>Грузоотправителям</div>
                  <div onClick={handleMenuOpen} className={s.routes}>Перевозчикам</div>
                  <div onClick={handleMenuOpen} className={s.routes}>Тарифы</div>
                  <div onClick={handleMenuOpen} className={s.routes}>О компании</div>
                  {!authStore?.isAuth && <div onClick={handleMenuOpen} className={s.margin}><Link href='/auth'><button className='auth'>Войти</button></Link><Link href='/registration'><button>Регистрация</button></Link></div>}
                  {authStore?.isAuth && <div onClick={handleMenuOpen} className={s.margin}><Link href='/requests' className={s.routes}>Кабинет</Link><button onClick={() => authStore.logout()}>Выйти</button></div>}
                </div>
            </nav>
          </div>
        </header>
      </RemoveScroll>
    )
}

export default inject('authStore')(observer(Header))