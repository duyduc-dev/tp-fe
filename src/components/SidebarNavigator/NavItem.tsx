import { Fragment, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import useAppLayout from '@/hooks/useAppLayout.ts';
import { cn } from '@/utils/helper';

import Button from '../Button';
import { DataItemList } from './SidebarGroup';

const WrapLink = ({
  link,
  children,
}: DataItemList & { children: (active: boolean) => ReactNode }) =>
  link ? (
    <NavLink to={link}>{({ isActive }) => children(isActive)}</NavLink>
  ) : (
    <Fragment>{children(false)}</Fragment>
  );

const NavItem = (props: DataItemList) => {
  const { isSidebarOpen } = useAppLayout();

  return (
    <WrapLink {...props}>
      {(isActive) => (
        <>
          <Button
            data-tooltip-id="tooltip-navbar"
            data-tooltip-content={props.title}
            data-tooltip-place="right"
            data-tooltip-hidden={isSidebarOpen}
            data-tooltip-delay-hide={800}
            data-tooltip-position-strategy="fixed"
            data-tooltip-delay-show={800}
            fullWidth
            onClick={props.onClick}
            className={cn(
              'flex items-center gap-4 !py-2  cursor-pointer transition-all !border-none',
              isActive && 'bg-white',
            )}
          >
            {props.icon}
            {isSidebarOpen && (
              <span
                className={cn(
                  'text-[14px] font-[400] text-neutral-500',
                  isActive && 'font-[500] text-black',
                )}
              >
                {props.title}
              </span>
            )}
          </Button>
        </>
      )}
    </WrapLink>
  );
};

export default NavItem;
