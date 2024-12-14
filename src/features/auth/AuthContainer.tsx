import { PropsWithChildren, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@/constants/Routes';
import { isAuthenticationValid } from '@/utils/helper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const AuthContainer = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const authValid = isAuthenticationValid(StorageHelper.getAuthToken());
    if (authValid) {
      navigate(Routes.ROOT);
    }
  }, []);

  return <>{children}</>;
};

export default AuthContainer;
