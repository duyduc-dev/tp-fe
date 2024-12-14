import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/constants';
import httpRequest from '@/https/Axios.ts';
import { MutationConfig } from '@/libs/react-query.ts';
import { DeviceRequest } from '@/types/request.ts';

type Request = {
  data: DeviceRequest;
};

const updateDevice = async ({ data }: Request) => {
  const res = await httpRequest.post<DeviceRequest>(API_URL.device.index, data);
  return res.data;
};

type Options = {
  configs?: MutationConfig<any, Request>;
};

const useUpdateDevice = ({ configs }: Options = {}) =>
  useMutation({
    mutationFn: updateDevice,
    ...configs,
  });

export default useUpdateDevice;
