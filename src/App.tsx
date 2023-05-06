import { observer } from 'mobx-react-lite';
import React, { useEffect, useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Context } from '.';
import LoginForm from './components/Form/LoginForm';
import { routeElements } from './config/routeElements';
import { IUser } from './models/response/IUser';

import './App.css';
import UserService from './services/UserService';


function App() {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  // if(!store.isAuth) {
  //   return (
  //     <Routes>
  //       <Route path='/'/>
  //       <Route path='/auth' element={<LoginForm type={'login'}/>}/>
  //       <Route path='/registration' element={<LoginForm/>}/>
  //     </Routes>
  //   )
  // }

  if(store.isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className='container'>
        <Routes>
        {/* <Route path='/'>

        </Route> */}
        {routeElements.map(route =>
        <Route key={route.path} path={route.path} element={<route.component/>}>
          {/* <h1>{store.isAuth? `Пользователь авторизован ${store.user.email}` : 'Авторизуйтесь!'}</h1>
          <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте': 'Подтвердите'}</h1>
          <button onClick={() => store.logout()}>Выйти</button>
          <div>
            <button onClick={getUsers}>Получить пользователей</button>
          </div>
          {users.map(user =>
            <div key={user.email}>{user.email}</div>)} */}
        </Route>
        )}
        </Routes>
    </div>
  );
}

export default observer(App);
