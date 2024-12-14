import { Outlet, type RouteObject } from 'react-router-dom';

import { Routes } from '@/constants/Routes';
import CourseContainer from '@/features/courses/components/CourseContainer.tsx';
import CourseDetailPage from '@/features/courses/CourseDetailPage';
import PaymentCoursePage from '@/features/courses/PaymentCoursePage';

import CoursePage from './CoursePage';

export const courseRoutes: RouteObject[] = [
  {
    path: Routes.COURSE,
    element: (
      <CourseContainer>
        <Outlet />
      </CourseContainer>
    ),
    children: [
      {
        index: true,
        element: <CoursePage />,
      },
      {
        path: Routes.COURSE_DETAILS,
        element: <CourseDetailPage />,
      },
      {
        path: Routes.PAYMENT_COURSE_DETAILS,
        element: <PaymentCoursePage />,
      },
    ],
  },
];
