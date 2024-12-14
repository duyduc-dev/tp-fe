import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import { useQueryString } from '@/hooks/useQueryString.ts';

type Props = {
  nextLessonId?: string;
  prevLessonId?: string;
};

const LessonNavigate = ({ prevLessonId, nextLessonId }: Props) => {
  const { t } = useTranslation();

  const [, setQueryString] = useQueryString();

  return (
    <div className="flex items-center gap-2 h-full">
      {prevLessonId && (
        <Button
          className="text-[13px] !h-auto py-3"
          variant="outline"
          onClick={() =>
            prevLessonId &&
            setQueryString({
              lessonId: prevLessonId,
            })
          }
        >
          {t`prevLesson`}
        </Button>
      )}
      {nextLessonId && (
        <Button
          className="text-[13px] !h-auto py-3"
          variant="primary"
          onClick={() =>
            nextLessonId &&
            setQueryString({
              lessonId: nextLessonId,
            })
          }
        >
          {t`nextLesson`}
        </Button>
      )}
    </div>
  );
};

export default LessonNavigate;
