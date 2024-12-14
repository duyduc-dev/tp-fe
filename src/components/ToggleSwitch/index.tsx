import { useState } from 'react';

import { cn } from '@/utils/helper.ts';

type Props = {
  defaultValue?: boolean;
  onChange?: (active: boolean) => void;
};

const ToggleSwitch = (props: Props) => {
  const { defaultValue = false, onChange } = props;

  const [isActive, setIsActive] = useState(defaultValue);

  return (
    <button
      onClick={() => {
        setIsActive((p) => {
          onChange?.(!p);
          return !p;
        });
      }}
      tabIndex={-1}
      className={cn(
        'outline-none w-[44px] rounded-full border h-[24px] border-neutral-100 flex px-[2px] items-center transition-all',
        isActive && 'justify-end bg-primary-500/20',
      )}
    >
      <div
        className={cn(
          'rounded-full w-[20px] h-[20px] bg-black transition-all',
          isActive && 'bg-primary-500',
        )}
      ></div>
    </button>
  );
};

export default ToggleSwitch;
