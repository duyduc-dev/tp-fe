import { useTranslation } from 'react-i18next';

import DiscussPopup from '@/components/DiscussPopup';
import { FormatDate } from '@/constants/enums/common.ts';
import { useQueryClientCourseDetail } from '@/features/courses/apis/getCourseDetail.ts';
import { useQueryClientGetLessonDetail } from '@/features/studying/apis/getLessonDetail.ts';
import LessonNavigate from '@/features/studying/components/LessonNavigate.tsx';
import { formatDate, getNextLessonId, getPrevLessonId } from '@/utils/helper.ts';

const FooterLessonDetail = () => {
  const { t } = useTranslation();

  const lessonDetail = useQueryClientGetLessonDetail();
  const courseDetail = useQueryClientCourseDetail();

  return (
    <div className="bg-white absolute bottom-0 left-0 right-0 h-[64px] border-t flex items-center justify-between px-4 border-neutral-100">
      <div>
        <DiscussPopup />
      </div>
      <div className="text-center">
        <p className="text-[15px] font-[600]">{lessonDetail?.title}</p>
        <p className="text-[13px]">
          {lessonDetail?.createdAt &&
            t(`updatedAt`, {
              time: formatDate(new Date(lessonDetail?.createdAt), FormatDate.DD_MM_yyyy),
            })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <LessonNavigate
          nextLessonId={getNextLessonId(courseDetail, lessonDetail) || ''}
          prevLessonId={getPrevLessonId(courseDetail, lessonDetail) || ''}
        />
      </div>
    </div>
  );
};

export default FooterLessonDetail;
