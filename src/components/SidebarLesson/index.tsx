import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Collapse, { CollapseRef } from '@/components/Collapse';
import { Constants } from '@/constants';
import useGetCourseChaptersBySlug from '@/features/courses/apis/getCourseChapters.ts';
import ContentLesson from '@/features/studying/components/ContentLesson.tsx';
import LabelLesson from '@/features/studying/components/LabelLesson.tsx';
import { cn } from '@/utils/helper.ts';

type Props = {
  containerClassName?: string;
};

const SidebarLesson = ({ containerClassName }: Props) => {
  const { t } = useTranslation();

  const collapseRef = useRef<CollapseRef>(null);
  const { slug: courseSlug = '' } = useParams();

  const { data: chaptersData = [] } = useGetCourseChaptersBySlug({ slug: courseSlug });

  // useIsomorphicLayoutEffect(() => {
  //   if (courseDetail?.lastLessonId && (!lessonId || lessonId?.length === 0)) {
  //     setQueryString({
  //       lessonId: courseDetail?.lastLessonId ?? '',
  //     });
  //   }
  // }, [lessonId, courseDetail?.lastLessonId]);

  return (
    <div className={cn('h-[calc(100vh_-_74px)] overflow-y-auto', containerClassName)}>
      <div className="h-full pr-0 ">
        <div
          style={{
            minWidth: Constants.WIDTH_SIDE_BAR_LESSON,
            maxWidth: Constants.WIDTH_SIDE_BAR_LESSON,
          }}
          className="w-full h-full pt-4 bg-white"
        >
          <h3 className="px-3 text-[18px] font-[600]">{t`contentLesson`}</h3>
          <Collapse
            ref={collapseRef}
            containerClassName="mt-4"
            data={chaptersData ?? []}
            labelClassName="w-full text-left"
            renderLabel={(item, index, isExpanded) => (
              <LabelLesson item={item} index={index} isOpen={isExpanded} />
            )}
            renderContent={(item, index, isExpanded) => (
              <ContentLesson item={item} index={index} isOpen={isExpanded} />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarLesson;
