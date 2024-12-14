import { Outlet, type RouteObject } from 'react-router-dom';

import { Routes } from '@/constants/Routes';

import BlogPage from './BlogPage';

export const blogRoutes: RouteObject[] = [
  {
    path: Routes.BLOG,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <BlogPage />,
      },
    ],
  },
];
