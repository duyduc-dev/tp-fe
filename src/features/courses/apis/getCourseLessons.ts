import { QueryOptions, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { LessonDetail } from '@/types/lesson.ts';
import { replacePathDynamic, toSnakeCaseKey } from '@/utils/helper.ts';

const getCourseLessonsBySlug = async (slug: string, chapterId: string) => {
  const res = await httpRequest.get<LessonDetail[]>(
    replacePathDynamic(API_URL.courses.courseLessons, { slug }),
    {
      params: toSnakeCaseKey({
        chapterId,
      }),
    },
  );

  return res.data;
};

type Options = {
  configs?: QueryOptions<LessonDetail[]>;
  slug: string;
  chapterId: string;
  enabled?: boolean;
};

const useGetCourseLessonsBySlug = ({ slug, chapterId, enabled = true, configs }: Options) =>
  useQuery({
    queryKey: [QueryKeys.COURSE_CHAPTER_LESSONS_SLUG, slug, chapterId],
    queryFn: () => getCourseLessonsBySlug(slug, chapterId),
    enabled: enabled && !!slug,
    ...configs,
  });

export default useGetCourseLessonsBySlug;
