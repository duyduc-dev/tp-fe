import { Outlet, type RouteObject } from 'react-router-dom';

import AuthProtected from '@/components/AuthProtected';
import { Routes } from '@/constants/Routes.ts';
import StudyingDetailPage from '@/features/studying/StudyingDetailPage';
import StudyingLayout from '@/layouts/StudyingLayout.tsx';

const studyingRoute: RouteObject[] = [
  {
    path: Routes.STUDYING,
    element: (
      <AuthProtected>
        <StudyingLayout>
          <Outlet />
        </StudyingLayout>
      </AuthProtected>
    ),
    children: [
      {
        index: true,
        element: <StudyingDetailPage />,
      },
    ],
  },
];

export default studyingRoute;
