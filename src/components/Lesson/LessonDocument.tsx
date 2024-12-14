import Markdown from '@uiw/react-markdown-preview';
import { useIsInViewport } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FormatDate } from '@/constants/enums/common.ts';
import { LessonStatus } from '@/constants/enums/Lessons.ts';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import { useQueryClientGetLessonDetail } from '@/features/studying/apis/getLessonDetail.ts';
import useUnlockNextLesson from '@/features/studying/apis/unlockNextLesson.ts';
import useCountDown from '@/hooks/useCountDown.ts';
import { formatDate } from '@/utils/helper.ts';

const LessonDocument = () => {
  const { t } = useTranslation();
  const divEndPageRef = useRef<HTMLDivElement>(null);

  const { mutateAsync } = useUnlockNextLesson();
  const { slug = '' } = useParams();
  const { refetch } = useGetCourseDetailBySlug({
    slug: slug,
  });
  const lessonDetail = useQueryClientGetLessonDetail();
  const isEndPage = useIsInViewport(divEndPageRef);
  const [count, apiCount] = useCountDown({
    countStart: Math.round(((lessonDetail?.duration ?? 0) * 2) / 3),
  });

  const checkCanNextLesson = async () => {
    if (isEndPage && count === 0 && lessonDetail) {
      const nextLesson = await mutateAsync({
        currentLessonId: lessonDetail?.id,
      });
      if (nextLesson) {
        refetch();
      }
    }
  };

  useEffect(() => {
    if (lessonDetail?.lessonStatus === LessonStatus.UNLOCKED) {
      apiCount.start();
    }
  }, [lessonDetail]);

  useEffect(() => {
    checkCanNextLesson();
  }, [isEndPage, count]);

  return (
    <div className="max-h-[calc(100vh_-_74px_-64px)] overflow-y-scroll">
      <div className="max-w-[720px] mx-auto p-4 ">
        <h1 className="text-[24px] font-[600] mb-2">{lessonDetail?.title}</h1>
        <p className="text-[14px] mb-5 text-blue-500">
          {lessonDetail &&
            t('updatedAt', {
              time: formatDate(new Date(lessonDetail?.createdAt), FormatDate.DD_MM_yyyy),
            })}
        </p>
        <Markdown
          wrapperElement={{ 'data-color-mode': 'light' }}
          className="mt-5 "
          source={lessonDetail?.content}
        />
        <div ref={divEndPageRef}></div>
      </div>
    </div>
  );
};

export default LessonDocument;
