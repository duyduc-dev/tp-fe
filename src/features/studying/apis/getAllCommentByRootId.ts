import { QueryOptions, useQuery } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import httpRequest from '@/https/Axios.ts';
import { CommentResponse } from '@/types/comment.ts';

const fetchAllCommentByRootId = async (rootId: string) => {
  const res = await httpRequest.get(`${API_URL.comment.index}/${rootId}`);
  return res.data;
};

type Options = {
  configs?: QueryOptions<CommentResponse[]>;
  rootId: string;
};

const useGetAllCommentByRootId = ({ rootId, configs }: Options) =>
  useQuery({
    queryKey: [QueryKeys.COMMENT_LESSON_ALL, rootId],
    enabled: !!rootId,
    queryFn: () => fetchAllCommentByRootId(rootId),
    ...configs,
  });

export default useGetAllCommentByRootId;
