import { useEffect, useRef } from 'react';

import { DialogRef } from '@/components/Dialog';
import LessonDocument from '@/components/Lesson/LessonDocument.tsx';
import LessonQuestion from '@/components/Lesson/LessonQuestion.tsx';
import LessonVideo from '@/components/Lesson/LessonVideo.tsx';
import { LessonType } from '@/constants/enums/Lessons.ts';
import useGetLessonDetail from '@/features/studying/apis/getLessonDetail.ts';
import FooterLessonDetail from '@/features/studying/components/FooterLessonDetail.tsx';
import { useQueryString } from '@/hooks/useQueryString.ts';
import SidebarEditorLayout from '@/layouts/SidebarEditorLayout.tsx';

const StudyingDetailPage = () => {
  const [{ lessonId }] = useQueryString<{ lessonId: string }>();

  const { data: lessonDetail } = useGetLessonDetail({ lessonId });

  const lessonType = lessonDetail?.lessonType;

  const dialogRef = useRef<DialogRef>(null);

  useEffect(() => {
    dialogRef.current?.open();
  }, []);

  return (
    <SidebarEditorLayout containerClassName="h-full relative">
      {lessonDetail && lessonType === LessonType.VIDEO && <LessonVideo />}
      {lessonDetail && lessonType === LessonType.DOCUMENT && <LessonDocument />}
      {lessonDetail && lessonType === LessonType.QUESTION && <LessonQuestion />}

      {/*<Authorization roles={[UserRole.ADMIN]}>*/}
      {/*<LessonAdjust />*/}
      {/*</Authorization>*/}
      <FooterLessonDetail />
    </SidebarEditorLayout>
  );
};

export default StudyingDetailPage;
