import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { GiDuration } from 'react-icons/gi';

import { ChapterDetail } from '@/types/chapter.ts';
import { cn, formatDuration } from '@/utils/helper.ts';

type Props = {
  item?: ChapterDetail;
  isOpen: boolean;
  index: number;
};
const LabelLesson = (props: Props) => {
  const { item, isOpen, index } = props;

  // const totalTime = item?.lessons.reduce((total, item) => total + (item.duration ?? 0), 0) ?? 0;
  //
  // const lessonDoneCount = item?.lessons.filter((item) => item.lessonStatus === LessonStatus.DONE);

  return (
    <div className={cn('w-full transition-all px-2 py-2 flex items-center')}>
      <div
        className={cn(
          'transition-all flex-1 flex items-center justify-between rounded-[4px] py-2 px-4 hover:bg-black/5',
          isOpen && '!bg-secondary-100 text-black',
        )}
      >
        <div className="flex-1 text-[15px]">
          <h4>
            {index + 1}. {item?.title}
          </h4>
          <div className="flex items-cemter gap-2 text-neutral-500">
            <p>
              {0}/{item?.lessonCount ?? 0}
            </p>
            -
            <p className="flex items-center gap-1">
              <GiDuration /> {formatDuration(0)}
            </p>
          </div>
        </div>
        {isOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
      </div>
    </div>
  );
};

export default LabelLesson;
