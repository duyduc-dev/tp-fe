import { Outlet, type RouteObject } from 'react-router-dom';

import { Routes } from '@/constants/Routes';

import AccountPage from './AccountPage';

export const accountRoutes: RouteObject[] = [
  {
    path: Routes.ACCOUNT,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <AccountPage />,
      },
    ],
  },
];
