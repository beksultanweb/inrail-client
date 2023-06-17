import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import s from './style.module.scss'
import { Context } from '../..'

import logo from '../../assets/images/Logo_inrail.png'



interface LocationState {
  from: {
    pathname: string;
  };
}


const Header = () => {
    const { store } = useContext(Context)
    const location = useLocation()

    return (
      <>
       <header className={location.pathname !== '/auth' && location.pathname !== '/registration' ? s.header_absolute : ''}>
          <div className='primary'>
            <nav>
                <Link to={'/'}>
                <img className={s.logo} src={logo}/>
                </Link>
                <div className={s.routes}>Грузоотправителям</div>
                <div className={s.routes}>Перевозчикам</div>
                <div className={s.routes}>Тарифы</div>
                <div className={s.routes}>О компании</div>
                {!store.isAuth && <div className={s.margin}><Link to={'/auth'}><button className='auth'>Войти</button></Link><Link to={'/registration'}><button>Регистрация</button></Link></div>}
                {store.isAuth && <button onClick={() => store.logout()}>Выйти</button>}
              <div>
                {/* <button onClick={getUsers}>Получить пользователей</button> */}
              </div>
              {/* {users.map(user =>
                <div key={user.email}>{user.email}</div>)} */}
                {/* <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте': 'Подтвердите'}</h1> */}
            </nav>
          </div>
        </header>
      </>
    )
}

export default observer(Header)