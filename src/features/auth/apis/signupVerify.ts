import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { SignUpRequest, TokenResponse } from '@/types/auth.ts';

const signupVerify = async (req: SignUpRequest) => {
  const { data } = await httpRequest.post<SignUpRequest, TokenResponse>(
    API_URL.auth.signUpVerify,
    req,
  );
  return data;
};

type Options = {
  configs?: MutationConfig<TokenResponse, SignUpRequest>;
};

const useSignUpVerify = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: signupVerify,

    ...configs,
  });

export default useSignUpVerify;
