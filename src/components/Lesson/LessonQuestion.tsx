import { useWindowSize } from 'hooks-react-custom';
import { useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { MdLoop } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import Button from '@/components/Button';
import ListRender from '@/components/ListRender';
import RadioButton from '@/components/RadioButton';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import { useQueryClientGetLessonDetail } from '@/features/studying/apis/getLessonDetail.ts';
import useUnlockNextLesson from '@/features/studying/apis/unlockNextLesson.ts';
import { cn } from '@/utils/helper.ts';

const LessonQuestion = () => {
  const { t } = useTranslation();
  const { width, height } = useWindowSize();
  const { mutateAsync } = useUnlockNextLesson();
  const { slug = '' } = useParams();
  const { refetch } = useGetCourseDetailBySlug({
    slug: slug,
  });
  const lessonDetail = useQueryClientGetLessonDetail();

  const [idActive, setIdActive] = useState<string>();
  const [answerError, setAnswerError] = useState<string>();
  const [answerCorrect, setAnswerCorrect] = useState<string>();

  const [disable, setDisable] = useState(false);

  const getAnswerCorrect = () => lessonDetail?.answers?.find((item) => item.correct);

  const handleAnswer = async () => {
    const answerCorr = getAnswerCorrect();
    if (answerCorr?.id !== idActive) {
      setAnswerError(idActive);
      setAnswerCorrect(answerCorr?.id);
    } else {
      setAnswerCorrect(idActive);
      setAnswerError(undefined);
      if (lessonDetail) {
        const nextLesson = await mutateAsync({ currentLessonId: lessonDetail?.id });
        if (nextLesson.id) {
          refetch();
        }
      }
    }
    setIdActive(undefined);
    setDisable(true);
  };

  const handleTryAgain = () => {
    setIdActive(undefined);
    setDisable(false);
    setAnswerError(undefined);
    setAnswerCorrect(undefined);
  };

  return (
    <div className="max-w-[720px] w-full mx-auto p-5">
      <h3 className="text-[24px] font-[500] mb-4">{lessonDetail?.title}</h3>
      <h4>{lessonDetail?.question}</h4>
      <ListRender
        containerClassName="mt-8"
        data={lessonDetail?.answers ?? []}
        renderItem={(item) => (
          <Button
            disabled={disable}
            onClick={() => setIdActive(item.id)}
            fullWidth
            className={cn(
              'text-left bg-neutral-100 mb-4 !py-3 !h-auto flex items-center gap-2',
              answerError === item.id && 'bg-error-100',
              answerCorrect === item.id && 'bg-success-100',
            )}
          >
            <RadioButton
              active={idActive === item.id || answerError === item.id || answerCorrect === item.id}
              type={answerError === item.id ? 'error' : 'success'}
            />
            {item.title}
          </Button>
        )}
      />
      <div className="flex justify-end">
        {answerError ? (
          <Button variant="secondary" className="flex items-center gap-3" onClick={handleTryAgain}>
            <MdLoop />
            {t`tryAgain`}
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleAnswer}>{t`answer`}</Button>
        )}
      </div>
      <ReactConfetti
        recycle={false}
        run={!!answerCorrect && answerError === undefined}
        width={width}
        height={height}
      />
    </div>
  );
};

export default LessonQuestion;
