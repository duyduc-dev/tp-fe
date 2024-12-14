import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import { Routes } from '@/constants/Routes.ts';

const CommonLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const { data } = useAuthInfo();

  useIsomorphicLayoutEffect(() => {
    if (data?.firstLogin) {
      navigate(Routes.INTRO);
    }
  }, [data?.firstLogin]);

  return <>{children}</>;
};

export default CommonLayout;
