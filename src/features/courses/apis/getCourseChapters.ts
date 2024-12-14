import { QueryOptions, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { ChapterDetail } from '@/types/chapter.ts';
import { replacePathDynamic } from '@/utils/helper.ts';

const getCourseChapterBySlug = async (slug: string) => {
  const res = await httpRequest.get<ChapterDetail[]>(
    replacePathDynamic(API_URL.courses.courseChapters, { slug }),
  );

  return res.data;
};

type Options = {
  configs?: QueryOptions<ChapterDetail[]>;
  slug: string;
};

const useGetCourseChaptersBySlug = ({ slug, configs }: Options) =>
  useQuery({
    queryKey: [QueryKeys.COURSE_CHAPTER_SLUG, slug],
    queryFn: () => getCourseChapterBySlug(slug),
    enabled: !!slug,
    ...configs,
  });

export default useGetCourseChaptersBySlug;
