import { ReactNode } from 'react';

import { cn } from '@/utils/helper';

import ListRender from '../ListRender';
import NavItem from './NavItem';

export type DataItemList = {
  icon?: ReactNode;
  title: string;
  link?: string;
  onClick?: () => void;
};

type Props = {
  label?: string;
  containerClassName?: string;
  contentClassName?: string;
  labelClassName?: string;
  listClassName?: string;
  listItemClassName?: string;
  list?: DataItemList[];
  renderBefore?: () => ReactNode;
  renderAfter?: () => ReactNode;
};

const SidebarGroup = (props: Props) => {
  const {
    containerClassName,
    label,
    list,
    contentClassName,
    labelClassName,
    renderBefore,
    renderAfter,
    listClassName,
    listItemClassName,
  } = props;
  return (
    <div className={containerClassName}>
      {label && (
        <h4 className={cn('font-[600] text-neutral-500 text-[14px]', labelClassName)}>{label}</h4>
      )}
      <div className={cn('mt-2', contentClassName)}>
        {renderBefore?.()}
        {list && (
          <ListRender
            itemClassName={listItemClassName}
            data={list}
            containerClassName={cn('pl-2', listClassName)}
            renderItem={(item) => (
              <div className="mb-2">
                <NavItem {...item} />
              </div>
            )}
          />
        )}
        {renderAfter?.()}
      </div>
    </div>
  );
};

export default SidebarGroup;
