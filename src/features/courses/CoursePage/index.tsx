import { useTranslation } from 'react-i18next';

import { SkeletonCard } from '@/components/BlogCard/SkeletonCard.tsx';
import LessonCard from '@/components/LessonCard';
import ListRender from '@/components/ListRender';
import { Routes } from '@/constants/Routes';
import useGetAllCourse from '@/features/courses/apis/getListCourse.ts';
import Container from '@/layouts/partial/Container.tsx';
import { replaceDynamicRoute } from '@/utils/helper';

const CoursePage = () => {
  const { t } = useTranslation();
  const { data: courseList = [], isLoading } = useGetAllCourse();

  return (
    <div className="px-4">
      <Container>
        <h3 className="py-4 text-[18px] font-RobotoBold">{t`courses`}</h3>
        <ListRender
          data={courseList}
          containerClassName="flex flex-wrap gap-3"
          renderItem={(item) => (
            <div key={item.id}>
              <LessonCard
                thumbnail={item.thumbnailUrl}
                title={item.title}
                link={replaceDynamicRoute(Routes.COURSE_DETAILS, item.slug)}
              />
            </div>
          )}
          renderEmpty={() => {
            if (isLoading) {
              return <SkeletonCard cards={4} containerClassName="w-[300px]" />;
            }
          }}
        />
      </Container>
    </div>
  );
};

export default CoursePage;
