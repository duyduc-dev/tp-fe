import { create } from 'zustand';

import { AuthDetail } from '@/types/auth.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

type State = {
  authDetail?: AuthDetail;
  setAuthDetail: (auth?: AuthDetail) => void;
};

const useAuthDetail = create<State>((set) => ({
  authDetail: StorageHelper.getAuthToken() ?? undefined,
  setAuthDetail: (auth) => set({ authDetail: auth }),
}));
export default useAuthDetail;
