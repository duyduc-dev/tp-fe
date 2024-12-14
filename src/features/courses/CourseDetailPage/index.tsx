import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserGroup } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

import AppTextEditorV2 from '@/components/TextEditorV2';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import CourseRedirect from '@/features/courses/components/CourseRedirect.tsx';
import LessonContentSession from '@/features/courses/components/LessonContentSession.tsx';
import Container from '@/layouts/partial/Container.tsx';
import { saveNumber } from '@/utils/helper';

const CourseDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug: courseSlug = '' } = useParams();
  const { data: courseDetail, refetch } = useGetCourseDetailBySlug({
    slug: courseSlug,
    configs: { retry: false },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Container>
        <div className="flex flex-1 gap-8 py-6 pt-3">
          <div className="flex-1 lg:w-2/3">
            <div className="">
              <h2 className="text-3xl font-semibold">{courseDetail?.title} </h2>
              <p className="text-[15px] text-neutral-500">{courseDetail?.description}</p>
              <div className="flex justify-between my-3 font-semibold text-neutral-600">
                <span className="flex items-center gap-1">
                  {saveNumber(courseDetail?.viewed)}
                  <FaUserGroup />
                </span>
              </div>
              <div className="mt-8">
                <h2 className="text-[24px] font-[500]">{t`archiveCourse`}</h2>
                <div className="mt-4 text-base text-neutral-500">
                  {courseDetail?.content && (
                    <AppTextEditorV2
                      readOnly
                      initialValue={JSON.parse(courseDetail?.content ?? '[]')}
                    />
                  )}
                </div>
              </div>
              <div className="mt-8">
                <CourseRedirect type="row" />
              </div>
            </div>
            <LessonContentSession />
          </div>
          <CourseRedirect />
        </div>
      </Container>
    </div>
  );
};

export default CourseDetailPage;
