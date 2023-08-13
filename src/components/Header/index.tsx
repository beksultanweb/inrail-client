import { observer, inject } from 'mobx-react'
import Link from 'next/link'
import s from './style.module.scss'
import { usePathname } from 'next/navigation'

import Image from 'next/image'

import logo from '../../assets/images/Logo_inrail.png'
import AuthStore from '../../store/AuthStore'
import { FC } from 'react'


interface HeaderProps {
  authStore?: typeof AuthStore
}

const Header: FC<HeaderProps> = ({ authStore }) => {
    const pathname = usePathname()
    return (
      <>
       <header className={`${s.header} ${pathname === '/' ? s.header_absolute : ''}`}>
          <div className='primary'>
            <nav className={s.nav}>
                <Link href='/'>
                <Image className={s.logo} src={logo} alt='logo' priority={true}/>
                </Link>
                <div className={s.routes}>Грузоотправителям</div>
                <div className={s.routes}>Перевозчикам</div>
                <div className={s.routes}>Тарифы</div>
                <div className={s.routes}>О компании</div>
                {!authStore?.isAuth && <div className={s.margin}><Link href='/auth'><button className='auth'>Войти</button></Link><Link href='/registration'><button>Регистрация</button></Link></div>}
                {authStore?.isAuth && <div className={s.margin}><Link href='/requests' className={s.routes}>Кабинет</Link><button onClick={() => authStore.logout()}>Выйти</button></div>}
              {/* {users.map(user =>
                <div key={user.email}>{user.email}</div>)} */}
                {/* <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте': 'Подтвердите'}</h1> */}
            </nav>
          </div>
        </header>
      </>
    )
}

export default inject('authStore')(observer(Header))