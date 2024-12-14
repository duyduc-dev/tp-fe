import { Outlet, redirect, type RouteObject } from 'react-router-dom';

import AuthProtected from '@/components/AuthProtected';
import { Routes } from '@/constants/Routes.ts';
import SettingAccountPage from '@/features/settings/SettingAccountPage';
import SettingContainer from '@/features/settings/SettingContainer.tsx';
import SettingSecurityPage from '@/features/settings/SettingSecurityPage';

const settingRoute: RouteObject[] = [
  {
    path: Routes.SETTINGS,
    element: (
      <AuthProtected fallbackUrl={Routes.AUTH_LOGIN}>
        <SettingContainer>
          <Outlet />
        </SettingContainer>
      </AuthProtected>
    ),
    children: [
      {
        index: true,
        loader: () => redirect(Routes.SETTINGS_ACCOUNT),
      },
      {
        path: Routes.SETTINGS_ACCOUNT,
        element: <SettingAccountPage />,
      },
      {
        path: Routes.SETTINGS_SECURITY,
        element: <SettingSecurityPage />,
      },
    ],
  },
];

export default settingRoute;
