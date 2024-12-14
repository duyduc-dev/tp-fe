import { Link, type LinkProps } from 'react-router-dom';

import { cn } from '@/utils/helper';

const InternalLink = (props: LinkProps) => {
  const { className, children, ...rest } = props;
  return (
    <Link {...rest} className={cn('font-[500] text-primary-500 hover:underline', className)}>
      {children}
    </Link>
  );
};

export default InternalLink;
