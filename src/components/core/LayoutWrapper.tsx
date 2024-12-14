import { PropsWithChildren } from 'react';

import { cn } from '@/utils/helper';

type Props = PropsWithChildren<{
  className?: string;
}>;

const LayoutWrapper = (props: Props) => {
  const { children, className } = props;
  return <div className={cn('min-h-screen ', className)}>{children}</div>;
};

export default LayoutWrapper;
