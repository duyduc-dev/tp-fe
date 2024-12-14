import { ITooltip,Tooltip as ReactTooltip } from 'react-tooltip';

import { cn } from '@/utils/helper';

type Props = ITooltip;

const AppTooltip = ({ anchorSelect, content, className, opacity = 1, ...props }: Props) => {
  return (
    <ReactTooltip
      anchorSelect={anchorSelect}
      content={content}
      delayShow={500}
      opacity={opacity}
      className={cn(
        '!bg-wash dark:!bg-neutral-100 dark:!text-neutral-900 !py-1 !font-[500] !rounded-[4px] !z-[99999999]',
        className,
      )}
      {...props}
    />
  );
};

export default AppTooltip;
