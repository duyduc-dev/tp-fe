import { QueryOptions, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { PaymentCourseQRResponse } from '@/types/course.ts';
import { replaceDynamicRoute } from '@/utils/helper.ts';

type Request = {
  token: string;
};

const getPaymentCourseSession = async ({ token }: Request) => {
  const res = await httpRequest.get<PaymentCourseQRResponse>(
    replaceDynamicRoute(API_URL.courses.paymentCourse, token),
  );
  return res.data;
};

type Options = {
  configs?: QueryOptions<PaymentCourseQRResponse>;
  token?: string;
};

const useGetPaymentCourseSession = ({ token, configs }: Options) =>
  useQuery({
    queryFn: () => getPaymentCourseSession({ token: token ?? '' }),
    queryKey: [token],
    enabled: !!token,
    ...configs,
  });

export default useGetPaymentCourseSession;
