import { Outlet, type RouteObject } from 'react-router-dom';

import ErrorBoundary from '@/components/ErrorBoundary';
import { Routes } from '@/constants/Routes.ts';
import { accountRoutes } from '@/features/account';
import authRoutes from '@/features/auth';
import { blogRoutes } from '@/features/blog';
import { courseRoutes } from '@/features/courses';
import homeRoutes from '@/features/home';
import { introRoutes } from '@/features/intro';
import settingRoute from '@/features/settings';
import studyingRoute from '@/features/studying';
import CommonLayout from '@/layouts/CommonLayout.tsx';
import DefaultLayout from '@/layouts/DefaultLayout.tsx';
import EmptyLayout from '@/layouts/EmptyLayout.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';

export const publicRoute: RouteObject[] = [
  {
    path: Routes.ROOT,
    element: (
      <CommonLayout>
        <Outlet></Outlet>
      </CommonLayout>
    ),
    children: [
      {
        path: Routes.ROOT,

        element: (
          <EmptyLayout>
            <Outlet />
          </EmptyLayout>
        ),
        children: [...authRoutes, ...introRoutes, ...studyingRoute],
      },
      {
        path: Routes.ROOT,
        element: (
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        ),
        children: [...accountRoutes, ...blogRoutes],
      },
      {
        path: Routes.ROOT,
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [...homeRoutes, ...courseRoutes, ...settingRoute],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
];
