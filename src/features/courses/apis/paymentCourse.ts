import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { TokenResponse } from '@/types/auth.ts';
import { replaceDynamicRoute } from '@/utils/helper.ts';

type Request = {
  courseId: string;
};

const postPaymentCourse = async ({ courseId }: Request) => {
  const res = await httpRequest.post<any, TokenResponse>(
    replaceDynamicRoute(API_URL.courses.paymentCourse, courseId),
  );
  return res.data;
};

type Options = {
  configs?: MutationConfig<TokenResponse, Request>;
};

const usePostPaymentCourse = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: postPaymentCourse,
    ...configs,
  });
export default usePostPaymentCourse;
