import { changeLanguage } from 'i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ThemeMode } from '@/constants/enums/common';
import { LanguageType } from '@/locales';

type State = {
  currentLanguage: LanguageType;
  themeMode: ThemeMode;
};

type Action = {
  setThemeMode: (theme: State['themeMode']) => void;
  toggleThemeMode: () => void;
  setLanguage: (lang: State['currentLanguage']) => void;
  setConfig: (data: Partial<State>) => void;
};

const useAppConfig = create<State & Action>()(
  persist(
    (set, get) => ({
      themeMode: ThemeMode.LIGHT,
      currentLanguage: LanguageType.VI,

      setThemeMode: (theme) => {
        set({ themeMode: theme });
        const isDark = theme === ThemeMode.DARK;
        document.body.classList[isDark ? 'add' : 'remove'](ThemeMode.DARK);
      },
      toggleThemeMode() {
        const nextTheme = get().themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
        get().setThemeMode(nextTheme);
      },
      setLanguage(lang) {
        set({ currentLanguage: lang });
        changeLanguage(lang);
      },
      setConfig(data) {
        const { currentLanguage, themeMode, ...restData } = data;
        currentLanguage && get().setLanguage(currentLanguage);
        themeMode && get().setThemeMode(themeMode);
        set(restData);
      },
    }),
    { name: 'app-config' },
  ),
);

export default useAppConfig;

export const getAppConfig = useAppConfig.getState();
