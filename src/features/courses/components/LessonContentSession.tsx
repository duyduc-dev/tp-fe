import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

import Collapse, { CollapseRef } from '@/components/Collapse';
import useGetCourseChaptersBySlug from '@/features/courses/apis/getCourseChapters.ts';
import LessonList from '@/features/courses/components/LessonList.tsx';
import { ChapterDetail } from '@/types/chapter.ts';
import { cn } from '@/utils/helper.ts';

const LessonContentSession = () => {
  const { t } = useTranslation();
  const { slug = '' } = useParams();
  const collapseRef = useRef<CollapseRef>(null);
  const { data = [] } = useGetCourseChaptersBySlug({ slug });

  const [isExpandContent, setIsExpandContent] = useState<boolean>(false);

  return (
    <div className="w-full my-10">
      <h2 className="text-[24px] font-RobotoMedium">{t`contentLesson`}</h2>
      <div className="flex items-center justify-between">
        <p className="text-neutral-500">
          <span className="font-bold">{data.length}</span> chương
        </p>
        <button
          onClick={() =>
            isExpandContent ? collapseRef.current?.closeAll() : collapseRef.current?.expandAll()
          }
          className="text-blue-500 underline font-RobotoMedium"
        >
          {isExpandContent ? t`closeAll` : t`expandAll`}
        </button>
      </div>
      <Collapse
        ref={collapseRef}
        containerClassName="mt-5"
        data={data}
        onChange={(expandedIndexes: number[]) => setIsExpandContent(expandedIndexes.length > 0)}
        containItemClassName="w-full mb-2"
        labelClassName="w-full"
        renderLabel={(item: ChapterDetail, index: number, isExpand: boolean) => (
          <div
            className={cn(
              'flex items-center justify-between px-5 py-3 bg-neutral-25 rounded-[8px]',
              'border border-neutral-50 hover:bg-neutral-100 transition-all dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-900',
            )}
          >
            <div className="flex items-center gap-4 ">
              {isExpand ? <LuMinus size={16} color="#555" /> : <LuPlus size={16} color="#555" />}
              <h3 className="font-[500] text-[14px] text-neutral-700 dark:text-neutral-200">
                {index + 1}. {item.title}
              </h3>
            </div>
            <div>
              <span className="text-[14px] font-[400]">
                {item.lessonCount} {t`lesson`}
              </span>
            </div>
          </div>
        )}
        renderContent={(chapterDetail: ChapterDetail, __, isExpanded) => (
          <LessonList chapter={chapterDetail} key={chapterDetail.id} isOpen={isExpanded} />
        )}
      />
    </div>
  );
};

export default LessonContentSession;
