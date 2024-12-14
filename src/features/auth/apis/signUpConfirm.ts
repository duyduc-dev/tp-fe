import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import useAuthDetail from '@/hooks/useAuthDetail.ts';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { AuthDetail, SignUpConfirmRequest } from '@/types/auth.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

const signUpConfirm = async (req: SignUpConfirmRequest) => {
  const { data } = await httpRequest.post<SignUpConfirmRequest, AuthDetail>(
    API_URL.auth.signUpConfirm,
    req,
  );

  return data;
};

type Options = {
  configs?: MutationConfig<AuthDetail, SignUpConfirmRequest>;
};

const useSignUpConfirm = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: signUpConfirm,
    onSuccess: (data) => {
      StorageHelper.setAuthToken(data);
      useAuthDetail.setState({
        authDetail: data,
      });
    },
    ...configs,
  });

export default useSignUpConfirm;
