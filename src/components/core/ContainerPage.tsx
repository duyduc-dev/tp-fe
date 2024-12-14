import { PropsWithChildren } from 'react';

import { cn } from '@/utils/helper';

import { WrapperContainerPage } from './styled';

type Props = PropsWithChildren<{
  className?: string;
  innerClassName?: string;
  spacingSidebar?: number;
}>;

const ContainerPage = (props: Props) => {
  const { children, className, spacingSidebar, innerClassName } = props;
  return (
    <WrapperContainerPage
      $spacingSidebar={spacingSidebar}
      className={cn(
        'h-full min-h-screen flex w-full p-4 pl-0 z-100 relative',
        !spacingSidebar && 'pl-4',
        className,
      )}
    >
      <div className={cn('bg-white rounded-[24px] flex-1', innerClassName)}>{children}</div>
    </WrapperContainerPage>
  );
};

export default ContainerPage;
