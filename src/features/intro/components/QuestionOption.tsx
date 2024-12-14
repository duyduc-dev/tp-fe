import { ReactNode, useState } from 'react';

import ListRender from '@/components/ListRender';
import { cn } from '@/utils/helper.ts';

type Options = {
  icon?: ReactNode;
  label: string;
};
type Props = {
  title: string;
  titleClassName?: string;
  itemActivatedClassName?: string;
  itemClassName?: string;
  options: Options[];
};

const QuestionOption = ({
  options = [],
  title,
  titleClassName,
  itemActivatedClassName,
  itemClassName,
}: Props) => {
  const [indexSelected, setIndexSelected] = useState(-1);

  return (
    <div className="">
      <h2 className={cn('text-[20px] font-[700] text-orange-500 text-center mb-5', titleClassName)}>
        {title}
      </h2>
      <ListRender
        data={options}
        renderItem={(item, index) => (
          <button
            onClick={() => setIndexSelected(index)}
            className={cn(
              'text-left px-4 py-2 rounded-[20px] mb-4 flex items-center w-full bg-neutral-100 gap-4 transition-all',
              itemClassName,
              indexSelected === index && cn('bg-orange-500/25', itemActivatedClassName),
            )}
          >
            {item.icon}
            <p className="flex-1">{item.label}</p>
          </button>
        )}
      />
    </div>
  );
};

export default QuestionOption;
