import { PropsWithChildren } from 'react';

import { cn } from '@/utils/helper.ts';

type Props = {
  containerClassName?: string;
  className?: string;
};

const Container = (props: PropsWithChildren<Props>) => {
  const { containerClassName, className, children } = props;

  return (
    <div className={cn('max-w-[1200px] w-full mx-auto px-4', containerClassName)}>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Container;
