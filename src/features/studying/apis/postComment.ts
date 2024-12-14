import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { CreateCommentRequest } from '@/types/comment.ts';

type RequestDto = {
  data: CreateCommentRequest;
};

const postComment = async ({ data }: RequestDto) => {
  const res = await httpRequest.post<CreateCommentRequest>(API_URL.comment.index, data);
  return res.data;
};

type Options = {
  configs?: MutationConfig<any, RequestDto>;
};

const usePostComment = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: postComment,
    ...configs,
  });

export default usePostComment;
