import '@/styles/app.css';
import '@/styles/common.scss';
import '@/locales/index';
import 'animate.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';

import LoadingScreen from '@/components/Loading/LoadingScreen.tsx';
import AppContainer from '@/core/AppContainer.tsx';
import { queryClient } from '@/libs/react-query.ts';
import RootRouteProvider from '@/routes';

import AppTooltip from './components/Tooltip';
import i18n, { LanguageResources } from './locales';
import { GlobalStateProvider } from './stores';

function App() {
  useEffect(() => {
    if (window) document.body.classList.add('global-color');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n} defaultNS={LanguageResources.Common}>
        <GlobalStateProvider>
          <AppContainer>
            <RootRouteProvider />
            <Toaster position="top-center" reverseOrder={false} />
            <AppTooltip id="tooltip-navbar" noArrow positionStrategy="fixed" />
            <LoadingScreen />
          </AppContainer>
        </GlobalStateProvider>
      </I18nextProvider>
      {/*<ReactQueryDevtools initialIsOpen={true} />*/}
    </QueryClientProvider>
  );
}

export default App;
