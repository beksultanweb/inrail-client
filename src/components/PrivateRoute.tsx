"use client"

import { useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { inject, observer } from 'mobx-react'
import AuthStore from '../store/AuthStore';


interface PrivateRouteProps {
    children: ReactNode;
    requiredRoles: number[];
    authStore?: typeof AuthStore;
  }

const PrivateRoute: FC<PrivateRouteProps> = ({ children, requiredRoles, authStore }) => {
  const router = useRouter();

  useEffect(() => {
    if (!authStore?.user || !authStore.user.roles?.find(role => requiredRoles.includes(role))) {
      router.push('/auth');
    }
  }, [authStore?.user]);

  return authStore?.user && authStore.user.roles?.find(role => requiredRoles.includes(role)) ? <>{children}</> : null;
};

export default inject('authStore')(observer(PrivateRoute));
