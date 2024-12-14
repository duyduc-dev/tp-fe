import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig, queryClient } from '@/libs/react-query.ts';
import { LessonDetail } from '@/types/lesson.ts';
import { replaceDynamicRoute } from '@/utils/helper.ts';

type Request = {
  lessonId: string;
};

const getLessonDetail = async ({ lessonId }: Request) => {
  const res = await httpRequest.get<LessonDetail>(
    replaceDynamicRoute(API_URL.lesson.detail, lessonId),
  );
  return res.data;
};

type Options = {
  configs?: MutationConfig<LessonDetail>;
  lessonId: string;
};

export const useGetLessonDetail = ({ lessonId, configs }: Options) =>
  useQuery({
    queryKey: [QueryKeys.LESSON_DETAIL_ID, lessonId],
    queryFn: () => getLessonDetail({ lessonId }),
    enabled: !!lessonId,
    staleTime: 10000,
    ...configs,
  });

export default useGetLessonDetail;

export const useQueryClientGetLessonDetail = () => {
  const [{ lessonId }] = useQueryString({ lessonId: '' });
  return queryClient.getQueryData<LessonDetail>([QueryKeys.LESSON_DETAIL_ID, lessonId]);
};
