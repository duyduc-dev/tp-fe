import { FC, PropsWithChildren, useEffect } from 'react';

import useAuthDetail from '@/hooks/useAuthDetail.ts';
import usePushNotification from '@/hooks/usePushNotification.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  usePushNotification();

  const { authDetail, setAuthDetail } = useAuthDetail();

  useEffect(() => {
    if (!authDetail && StorageHelper.getAuthToken()) {
      setAuthDetail(StorageHelper.getAuthToken() ?? undefined);
    }
  }, [authDetail]);

  return <>{children}</>;
};

export default AppContainer;
