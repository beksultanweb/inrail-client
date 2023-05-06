import { appRoutes } from './appRoutes';

import { withLayout } from '../HOC/withLayout';
import { Auth } from '../pages/Auth';
import { Home } from '../pages/Home';
import { NoMatch } from '../pages/NoMatch';
import { Prices } from '../pages/Prices';


export const routeElements = [
  {
    id: 1,
    name: 'Главная',
    path: appRoutes.home,
    component: withLayout(Home)
  },
  {
    id: 2,
    name: 'Тарифы',
    path: appRoutes.prices,
    component: withLayout(Prices)
  },
  {
    id: 3,
    path: appRoutes.notFound,
    component: withLayout(NoMatch)
  },
  {
    id: 4,
    path: appRoutes.auth,
    component: withLayout(Auth)
  },
  {
    id: 5,
    path: appRoutes.registration,
    component: withLayout(Auth)
  }
];