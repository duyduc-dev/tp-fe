import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import useAuthDetail from '@/hooks/useAuthDetail.ts';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { AuthDetail, TokenGoogleLogin } from '@/types/auth.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

type Request = {
  token: string;
};

const googleLogin = async ({ token }: Request) => {
  const { data } = await httpRequest.post<TokenGoogleLogin, AuthDetail>(API_URL.auth.googleLogin, {
    token,
  });
  return data;
};

type Options = {
  configs?: MutationConfig<AuthDetail, Request>;
};

const useGoogleLogin = ({ configs }: Options = {}) =>
  useMutation({
    mutationKey: ['google-login'],
    mutationFn: googleLogin,
    onSuccess: (data) => {
      StorageHelper.setAuthToken(data);
      useAuthDetail.setState({
        authDetail: data,
      });
    },
    ...configs,
  });

export default useGoogleLogin;
