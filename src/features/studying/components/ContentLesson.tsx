import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaPlay } from 'react-icons/fa';
import { LuLock, LuTimer } from 'react-icons/lu';

import ListRender from '@/components/ListRender';
import { LessonStatus, LessonType } from '@/constants/enums/Lessons.ts';
import { useQueryClientCourseDetail } from '@/features/courses/apis/getCourseDetail.ts';
import useGetCourseLessonsBySlug from '@/features/courses/apis/getCourseLessons.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';
import { ChapterDetail } from '@/types/chapter.ts';
import { LessonDetail } from '@/types/lesson.ts';
import { cn, formatDuration } from '@/utils/helper.ts';

type Props = {
  item?: ChapterDetail;
  isOpen: boolean;
  index: number;
};
const ContentLesson = ({ item }: Props) => {
  const [{ lessonId }, setQueryStr] = useQueryString<{ lessonId: string }>();

  const mappingIconLesson = {
    [LessonType.VIDEO]: <FaPlay size={10} />,
    [LessonType.DOCUMENT]: <CgFileDocument size={16} />,
    [LessonType.QUESTION]: <BsFillQuestionCircleFill size={16} />,
  };

  const courseDetail = useQueryClientCourseDetail();
  const { data: lessonDetailList } = useGetCourseLessonsBySlug({
    slug: courseDetail?.slug ?? '',
    chapterId: item?.id ?? '',
  });

  const handleClick = (lesson: LessonDetail) => {
    if (lessonId === lesson.id) return;
    setQueryStr({
      lessonId: lesson.id,
    });
  };

  return (
    <ListRender
      data={lessonDetailList ?? []}
      renderItem={(lesson) => {
        const isLock = lesson.lessonStatus === LessonStatus.LOCKED;
        return (
          <button
            tabIndex={-1}
            onClick={() => !isLock && handleClick(lesson)}
            className={cn(
              'pr-4 pl-4 py-2 w-full text-left outline-none flex gap-2 hover:bg-[rgba(0,0,0,0.05)] transition-all',
              isLock && 'bg-neutral-50',
              lessonId === lesson.id && 'bg-black/10',
            )}
          >
            <div className="w-[20px] h-[20px] flex items-center justify-center">
              {mappingIconLesson?.[lesson.lessonType ?? LessonType.VIDEO]}
            </div>
            <div className="flex-1">
              <span className="text-neutral-600 text-[15px]">
                {lesson.order + 1}. {lesson.title}
              </span>
              <div className="flex items-center gap-1 text-neutral-500 text-[15px]">
                {formatDuration(lesson.duration * 1000)} <LuTimer />
              </div>
            </div>
            {isLock && <LuLock />}
          </button>
        );
      }}
    />
  );
};

export default ContentLesson;
