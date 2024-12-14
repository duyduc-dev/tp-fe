import { PropsWithChildren } from 'react';

import Footer from '@/layouts/partial/Footer';
import MainHeader from '@/layouts/partial/Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <MainHeader />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
