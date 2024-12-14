import { create } from 'zustand';

type State = {
  isSidebarOpen: boolean;
  isLoadingScreen: boolean;
};

type Action = {
  setSidebarOpen: (show: boolean) => void;
  setLoadingScreen: (show: boolean) => void;
};

const useAppLayout = create<State & Action>((set) => ({
  isSidebarOpen: true,
  isLoadingScreen: false,
  setSidebarOpen: (isShow) => set({ isSidebarOpen: isShow }),
  setLoadingScreen: (show) => set({ isLoadingScreen: show }),
}));

export default useAppLayout;
