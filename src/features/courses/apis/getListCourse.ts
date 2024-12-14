import { QueryOptions, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { CourseDetail } from '@/types/course.ts';

const getListCourse = async () => {
  const { data } = await httpRequest.get(API_URL.courses.all);
  return data;
};

type Options = {
  configs?: QueryOptions<CourseDetail[]>;
};

const useGetAllCourse = ({ configs }: Options = {}) => {
  return useQuery({
    queryKey: [QueryKeys.COURSE_LIST],
    queryFn: () => getListCourse(),
    ...configs,
  });
};

export default useGetAllCourse;
