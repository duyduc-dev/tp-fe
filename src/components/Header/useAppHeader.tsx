import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type DevModeState = {
  isShowBtn: boolean;
  isOpenDevMode: boolean;
  isAutoCompiler: boolean;
};

type State = {
  devMode: DevModeState;
};

type Actions = {
  setDevMode: (data: Partial<DevModeState>) => void;
};

const useAppHeader = create<State & Actions>()(
  immer((set) => ({
    devMode: {
      isOpenDevMode: false,
      isShowBtn: false,
      isAutoCompiler: true,
    },
    setDevMode: (data) =>
      set((state) => {
        if (data.isOpenDevMode !== undefined) state.devMode.isOpenDevMode = data.isOpenDevMode;
        if (data.isShowBtn !== undefined) state.devMode.isShowBtn = data.isShowBtn;
        if (data.isAutoCompiler !== undefined) state.devMode.isAutoCompiler = data.isAutoCompiler;
      }),
  })),
);

export default useAppHeader;
