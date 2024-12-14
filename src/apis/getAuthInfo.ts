import { QueryOptions, useQuery } from '@tanstack/react-query';

import AuthApi from '@/apis/AuthApi.ts';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import { UserDetail } from '@/types/user.ts';
import storageHelper from '@/utils/StorageHelper.ts';

type Options = {
  configs?: QueryOptions<UserDetail>;
};

const useAuthInfo = ({ configs }: Options = {}) =>
  useQuery({
    queryKey: [QueryKeys.USER_DETAIL, storageHelper.getAuthToken()?.accessToken],
    queryFn: () => AuthApi.getAuthInfo(),

    enabled: !!storageHelper.getAuthToken()?.accessToken,
    gcTime: 15 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
    ...configs,
  });

export default useAuthInfo;
