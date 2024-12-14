import { PropsWithChildren } from 'react';

const IntroLayout = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[1200px] px-20px mx-auto w-full">{children}</div>;
};

export default IntroLayout;
