import { Outlet, type RouteObject } from 'react-router-dom';

import { Routes } from '@/constants/Routes.ts';
import HomePage from '@/features/home/HomePage/HomePage.tsx';

const homeRoutes: RouteObject[] = [
  {
    path: Routes.ROOT,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default homeRoutes;
