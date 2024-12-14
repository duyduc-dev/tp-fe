import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { LessonDetail } from '@/types/lesson.ts';
import { toSnakeCaseKey } from '@/utils/helper.ts';

type Request = {
  currentLessonId: string;
};

const unlockNextLesson = async (body: Request) => {
  const res = await httpRequest.post<Request, LessonDetail>(API_URL.courses.nextLesson, {} as any, {
    params: toSnakeCaseKey({
      currentLessonId: body.currentLessonId,
    }),
  });
  return res.data;
};

type Options = {
  configs?: MutationConfig<LessonDetail, Request>;
};

const useUnlockNextLesson = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: unlockNextLesson,
    ...configs,
  });

export default useUnlockNextLesson;
