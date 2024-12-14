import { PropsWithChildren, ReactNode, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ForbiddenPage from '@/components/ErrorPage/ForbiddenPage.tsx';
import { isAuthenticationValid } from '@/utils/helper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

type Props = PropsWithChildren<{
  fallbackComponent?: ReactNode;
  onFallback?: () => void;
  fallbackUrl?: string;
}>;

const AuthProtected = (props: Props) => {
  const { fallbackUrl, children, fallbackComponent = <ForbiddenPage />, onFallback } = props;
  const navigate = useNavigate();
  const isAuthValid = isAuthenticationValid(StorageHelper.getAuthToken());

  useEffect(() => {
    if (!isAuthValid) {
      onFallback?.();
    }
  }, [isAuthValid]);

  useLayoutEffect(() => {
    if (fallbackUrl && !isAuthValid) {
      navigate(fallbackUrl);
    }
  }, [fallbackUrl, isAuthValid]);

  return <>{isAuthValid ? children : fallbackComponent}</>;
};

export default AuthProtected;
