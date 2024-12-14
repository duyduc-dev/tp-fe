import { FaPlay } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import useGetCourseLessonsBySlug from '@/features/courses/apis/getCourseLessons.ts';
import { ChapterDetail } from '@/types/chapter.ts';

type Props = {
  chapter: ChapterDetail;
  isOpen: boolean;
};

const LessonList = ({ chapter, isOpen }: Props) => {
  const { slug = '' } = useParams();
  const { data = [] } = useGetCourseLessonsBySlug({
    slug,
    chapterId: chapter.id,
    enabled: isOpen,
  });
  return (
    <ul>
      {data.map((content, i) => (
        <li
          key={`${i}`}
          className="flex items-center justify-between pl-14 pr-5 py-3 text-[14px] border-b border-neutral-50 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 "
        >
          <div className="flex items-center gap-3">
            <FaPlay color="#555" size={12} />
            <span>
              {i + 1}. {content.title}
            </span>
          </div>
          <span>{content.duration}</span>
        </li>
      ))}
    </ul>
  );
};

export default LessonList;
