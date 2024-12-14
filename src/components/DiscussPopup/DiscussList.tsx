import { forwardRef, useEffect } from 'react';

import CommentItem from '@/components/DiscussPopup/CommentItem.tsx';
import ListRender from '@/components/ListRender';
import useGetAllCommentByRootId from '@/features/studying/apis/getAllCommentByRootId.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';

export type DiscussListRef = {
  fetchCmt: () => Promise<void>;
};
const DiscussList = forwardRef<DiscussListRef>(() => {
  const [{ lessonId }] = useQueryString<{ lessonId: string }>({ lessonId: '' });
  const { data: commentList, refetch } = useGetAllCommentByRootId({
    rootId: lessonId,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="mt-5">
      <ListRender data={commentList ?? []} renderItem={(item) => <CommentItem item={item} />} />
    </div>
  );
});
DiscussList.displayName = 'DiscussList';
export default DiscussList;
