import Markdown from '@uiw/react-markdown-preview';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsSpeedometer } from 'react-icons/bs';
import { IoIosWarning } from 'react-icons/io';
import { type OnProgressProps } from 'react-player/base';
import { useParams } from 'react-router-dom';

import Button from '@/components/Button';
import Dialog, { DialogRef } from '@/components/Dialog';
import AppVideo, { AppVideoRef } from '@/components/Video';
import { colors } from '@/constants/colors.ts';
import { LessonStatus } from '@/constants/enums/Lessons.ts';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import { useQueryClientGetLessonDetail } from '@/features/studying/apis/getLessonDetail.ts';
import useUnlockNextLesson from '@/features/studying/apis/unlockNextLesson.ts';
import { cn, sleep } from '@/utils/helper.ts';

const LessonVideo = () => {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const { mutateAsync: unlockNextLesson } = useUnlockNextLesson();
  const { refetch } = useGetCourseDetailBySlug({
    slug: slug,
  });
  const lessonDetail = useQueryClientGetLessonDetail();
  const isCalledNextLesson = useRef(false);
  const currentTimeRef = useRef<any>();
  const videoRef = useRef<AppVideoRef>(null);

  const dialogRef = useRef<DialogRef>(null);

  const [duration, setDuration] = useState<number>();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const getPercentVideo = (time?: number) => (time && duration ? time / duration : 0);

  const unlockVideoLesson = async (loadedSeconds: number) => {
    if (isCalledNextLesson.current) {
      return;
    }
    const isValid =
      duration &&
      loadedSeconds / duration > 0.9 &&
      lessonDetail?.lessonStatus === LessonStatus.UNLOCKED;
    if (!isValid) return;

    try {
      await unlockNextLesson({
        currentLessonId: lessonDetail.id,
      });
      isCalledNextLesson.current = true;
      await refetch();
    } catch (e) {
      console.log('e >>', e);
    }
  };

  const handleProgress = async (e: OnProgressProps) => {
    if (e.playedSeconds === 0) {
      currentTimeRef.current = undefined;
    }
    if (
      lessonDetail?.lessonStatus === LessonStatus.UNLOCKED &&
      currentTimeRef.current &&
      getPercentVideo(e.playedSeconds) - getPercentVideo(currentTimeRef.current) > 0.05
    ) {
      videoRef.current?.seekTo(
        Math.abs(currentTimeRef.current - (currentTimeRef.current * 20) / 100),
      );
      await sleep(100);
      setIsPlayingVideo(false);
      dialogRef.current?.open();
      return;
    }
    unlockVideoLesson(e.playedSeconds);
    currentTimeRef.current = e.playedSeconds;
  };

  return (
    <div className="px-4 flex-1 min-w-[50%] max-h-[calc(100vh_-_74px_-64px)] overflow-y-scroll">
      <div className="max-w-[840px] mx-auto p-4 ">
        <AppVideo
          playing={isPlayingVideo}
          onPlay={() => setIsPlayingVideo(true)}
          innerRef={videoRef}
          onProgress={handleProgress}
          videoId={lessonDetail?.videoId ?? ''}
          onDuration={(_duration) => setDuration(_duration)}
          containerClassName={cn('mx-auto')}
        />
        <div className="mt-2">
          <h1 className="text-[24px] font-[600]">{lessonDetail?.title}</h1>
          <Markdown
            wrapperElement={{ 'data-color-mode': 'light' }}
            className="mt-5 "
            source={lessonDetail?.content}
          />
        </div>

        <Dialog
          title={
            <div className="flex items-center gap-2">
              <IoIosWarning color={colors['warning-500']} size={20} />
              <span>Cảnh báo</span>
            </div>
          }
          onClose={() => setIsPlayingVideo(true)}
          ref={dialogRef}
        >
          <div className="flex items-center px-4 gap-3 mt-5">
            <BsSpeedometer size={42} color={colors['neutral-500']} />
            <p>Bạn đang coi quá nhanh, vui lòng không tua để không bỏ lỡ kiến thức cần thiết</p>
          </div>
          <div className="flex justify-end mt-6">
            <Button
              onClick={() => dialogRef.current?.close()}
              variant="primary"
            >{t`continue`}</Button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LessonVideo;
