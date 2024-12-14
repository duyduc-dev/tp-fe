import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa6';

import Button from '@/components/Button';
import Dialog, { DialogRef } from '@/components/Dialog';
import DiscussList from '@/components/DiscussPopup/DiscussList.tsx';
import InputDiscuss, { InputDiscussRef } from '@/components/DiscussPopup/InputDiscuss.tsx';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import usePostComment from '@/features/studying/apis/postComment.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';
import { CommentType } from '@/types/comment.ts';
import { LessonDetail } from '@/types/lesson.ts';

const DiscussPopup = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutateAsync: postComment } = usePostComment();

  const [{ lessonId = '' }] = useQueryString();
  const lessonDetail = queryClient.getQueryData<LessonDetail>([
    QueryKeys.LESSON_DETAIL_ID,
    lessonId,
  ]);
  const [value, setValue] = useState('');

  const dialogRef = useRef<DialogRef>(null);
  const inputRef = useRef<InputDiscussRef>(null);
  const handlePostComment = async () => {
    if (!lessonDetail?.id) return;
    inputRef.current?.clear();
    inputRef.current?.setModeAdvanced(false);
    const data = {
      rootId: lessonDetail?.id,
      type: CommentType.LESSON,
      content: value,
    };
    await postComment({ data: data });
  };

  return (
    <div className="h-full flex items-center">
      <Button
        onClick={() => dialogRef.current?.open()}
        className="flex items-center gap-2 !h-auto py-2 text-[13px]"
        variant="secondary"
      >
        <FaRegCommentDots size={16} />
        {t`discuss`}
      </Button>
      <Dialog
        title={t`discuss`}
        containerClassName="max-w-[840px] min-h-[95vh] relative"
        ref={dialogRef}
      >
        <div className="mt-4">
          <InputDiscuss ref={inputRef} onChangeText={setValue} />
          <div className="flex justify-end mt-2">
            <Button
              onClick={handlePostComment}
              disabled={!value}
              variant="primary"
              className="!h-auto !py-2 text-[14px]"
            >{t`send`}</Button>
          </div>
        </div>

        <DiscussList />

        <Button
          onClick={() => dialogRef.current?.close()}
          className="!absolute top-2 right-2 !rounded-full bg-neutral-100"
        >
          <FaTimes />
        </Button>
      </Dialog>
    </div>
  );
};

export default DiscussPopup;
