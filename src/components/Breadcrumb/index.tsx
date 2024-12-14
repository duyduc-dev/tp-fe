import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/utils/helper';

export type BreadcrumbItem = {
  title: string;
  link: string;
  icon?: ReactNode;
  active?: boolean;
};

type Props = {
  data: BreadcrumbItem[];
  separator?: string;
  activeIndex?: number;
  containerClassName?: string;
};

const Breadcrumb = (props: Props) => {
  const { data = [], separator = '/', activeIndex, containerClassName } = props;
  return (
    <div className={cn('flex items-center gap-2', containerClassName)}>
      {data.map((dataItem, index) => (
        <div key={`${index}-${dataItem.title}`} className="flex items-center gap-2">
          <NavLink
            to={dataItem.link}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 text-[14px]',
                ((!activeIndex && isActive) || activeIndex === index || dataItem?.active) &&
                  'font-[500] text-primary-500',
              )
            }
          >
            {dataItem.icon}
            <span>{dataItem.title}</span>
          </NavLink>
          {index !== data.length - 1 && <span>{separator}</span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
