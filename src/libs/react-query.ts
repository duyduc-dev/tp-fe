import { type DefaultOptions, MutateOptions, QueryClient } from '@tanstack/react-query';

import { HttpResponse } from '@/types/common.ts';

const queryConfig: DefaultOptions = {
  queries: {
    throwOnError: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type MutationConfig<R = any, P = any> = MutateOptions<R, HttpResponse, P>;
