import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import useAuthDetail from '@/hooks/useAuthDetail.ts';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { AuthDetail, LoginRequest } from '@/types/auth.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const login = async (data: LoginRequest) => {
  const res = await httpRequest.post<LoginRequest, AuthDetail>(API_URL.auth.login, data);
  return res.data;
};

type Options = {
  configs?: MutationConfig<AuthDetail, LoginRequest>;
};

const useLogin = ({ configs }: Options = {}) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (data) => {
      StorageHelper.setAuthToken(data);
      useAuthDetail.setState({
        authDetail: data,
      });
    },
    ...configs,
  });

export default useLogin;
