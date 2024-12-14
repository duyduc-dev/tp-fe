import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';

const updateUserSurvey = async () => {
  const res = await httpRequest.post(API_URL.user.survey);
  return res.data;
};

type Options = {
  configs?: MutationConfig;
};

export const useUpdateUserSurvey = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: updateUserSurvey,
    ...configs,
  });
