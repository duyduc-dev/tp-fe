import { PropsWithChildren } from 'react';

import ContainerPage from '@/components/core/ContainerPage';
import LayoutWrapper from '@/components/core/LayoutWrapper';
import Header from '@/components/Header';
import SidebarNavigator from '@/components/SidebarNavigator';
import { Constants } from '@/constants';
import useAppLayout from '@/hooks/useAppLayout.ts';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const { isSidebarOpen } = useAppLayout();

  return (
    <LayoutWrapper className="flex min-h-screen bg-neutral-100">
      <SidebarNavigator />
      <ContainerPage
        spacingSidebar={isSidebarOpen ? Constants.WIDTH_SIDE_BAR : Constants.WIDTH_SIDE_BAR_SMALL}
      >
        <Header />
        {children}
      </ContainerPage>
    </LayoutWrapper>
  );
};

export default DefaultLayout;
