import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LuBell, LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import Breadcrumb, { BreadcrumbItem } from '@/components/Breadcrumb';
import AvatarPopup from '@/components/Header/AvatarPopup.tsx';
import DevModeEditorOptions from '@/components/Header/DevModeEditorOptions.tsx';
import useAppHeader from '@/components/Header/useAppHeader.tsx';
import { Routes } from '@/constants/Routes.ts';
import { cn } from '@/utils/helper.ts';

import Button from '../Button';
import Input from '../Input';

type Props = {
  containerClassName?: string;
  tabs?: BreadcrumbItem[];
  showLogo?: boolean;
  showAvatar?: boolean;
  containerLeftClassName?: string;
  renderLeftBefore?: () => ReactNode;
};
const Header = ({
  containerClassName,
  tabs,
  showLogo,
  showAvatar,
  containerLeftClassName,
  renderLeftBefore,
}: Props) => {
  const { t } = useTranslation();
  const { devMode } = useAppHeader();

  const { data: userDetail } = useAuthInfo();

  return (
    <header className={cn('min-h-[74px] px-4 flex items-center ', containerClassName)}>
      <div className="flex items-center justify-between h-full w-full">
        <div className={cn('flex items-center gap-2', containerLeftClassName)}>
          {showLogo && (
            <Link
              to={Routes.ROOT}
              className="p-3 bg-neutral-100 rounded-[12px] text-[18px] font-[700]"
            >
              TP
            </Link>
          )}
          {tabs && <Breadcrumb data={tabs} />}
        </div>
        <div className="flex items-center gap-4">
          {renderLeftBefore?.()}
          {devMode.isShowBtn && <DevModeEditorOptions />}
          <Input
            containerInputClassName="h-[32px] py-[2px] text-[13px]"
            placeholder={t`search`}
            leftIcon={<LuSearch />}
          />
          <Button>
            <LuBell />
          </Button>
          {showAvatar && userDetail && <AvatarPopup data={userDetail} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
