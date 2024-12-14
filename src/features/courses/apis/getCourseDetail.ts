import { QueryOptions, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { queryClient } from '@/libs/react-query.ts';
import { CourseDetail } from '@/types/course.ts';
import { replacePathDynamic } from '@/utils/helper.ts';

const getCourseDetailBySlug = async (slug: string) => {
  const res = await httpRequest.get<CourseDetail>(
    replacePathDynamic(API_URL.courses.courseDetailBySlug, { slug }),
  );

  return res.data;
};

type Options = {
  configs?: QueryOptions<CourseDetail>;
  slug: string;
};

const useGetCourseDetailBySlug = ({ slug, configs }: Options) =>
  useQuery({
    queryKey: [QueryKeys.COURSE_DETAIL_SLUG, slug],
    queryFn: () => getCourseDetailBySlug(slug),
    enabled: !!slug,
    ...configs,
  });

export default useGetCourseDetailBySlug;

export const useQueryClientCourseDetail = () => {
  const { slug } = useParams();
  return queryClient.getQueryData<CourseDetail>([QueryKeys.COURSE_DETAIL_SLUG, slug]);
};
