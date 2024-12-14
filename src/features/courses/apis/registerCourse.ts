import { useMutation, useQueryClient } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { replaceDynamicRoute } from '@/utils/helper.ts';

type Request = {
  courseId: string;
};
export enum RegisterCourseStatus {
  PENDING = 'PENDING',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
}
export type RegisterCourseResponse = {
  expireTime: number;
  key: string;
  status: RegisterCourseStatus;
};

const registerCourse = async ({ courseId }: Request) => {
  const { data } = await httpRequest.post(replaceDynamicRoute(API_URL.courses.register, courseId));
  return data;
};

type Options = {
  configs?: MutationConfig<RegisterCourseResponse, Request>;
  courseSlug?: string;
};

const useRegisterCourse = ({ configs, courseSlug }: Options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerCourse,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.COURSE_DETAIL_SLUG, courseSlug],
      });
    },
    ...configs,
  });
};
export default useRegisterCourse;
