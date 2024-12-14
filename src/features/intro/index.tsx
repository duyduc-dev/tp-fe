import { Outlet, type RouteObject } from 'react-router-dom';

import AuthProtected from '@/components/AuthProtected';
import { Routes } from '@/constants/Routes.ts';
import IntroDetail from '@/features/intro/IntroDetail.tsx';
import IntroLayout from '@/features/intro/IntroLayout.tsx';

export const introRoutes: RouteObject[] = [
  {
    path: '/intro',
    element: (
      <AuthProtected fallbackUrl={Routes.ROOT}>
        <IntroLayout>
          <Outlet />
        </IntroLayout>
      </AuthProtected>
    ),
    children: [
      {
        index: true,
        element: <IntroDetail />,
      },
    ],
  },
];
