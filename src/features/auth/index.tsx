import { Outlet, redirect, type RouteObject } from 'react-router-dom';

import { Routes } from '@/constants/Routes.ts';
import LoginPage from '@/features/auth/Login';
import SignUpPage from '@/features/auth/Signup';

import AuthContainer from './AuthContainer';

const authRoutes: RouteObject[] = [
  {
    path: Routes.AUTH,
    element: <Outlet />,
    children: [
      {
        index: true,
        loader: () => redirect(Routes.AUTH_LOGIN),
      },
      {
        path: Routes.AUTH_LOGIN,
        element: (
          <AuthContainer>
            <LoginPage />
          </AuthContainer>
        ),
      },
      {
        path: Routes.SIGNUP,
        element: (
          <AuthContainer>
            <SignUpPage />
          </AuthContainer>
        ),
      },
    ],
  },
];

export default authRoutes;
