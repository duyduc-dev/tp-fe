import { useIsomorphicLayoutEffect, useMediaQuery } from 'hooks-react-custom';
import { useTranslation } from 'react-i18next';
import { LuCode2, LuHome } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import Button from '@/components/Button';
import SidebarGroup from '@/components/SidebarNavigator/SidebarGroup';
import { Constants } from '@/constants';
import { colors } from '@/constants/colors';
import { Routes } from '@/constants/Routes';
import useAppLayout from '@/hooks/useAppLayout.ts';
import { cn, sleep } from '@/utils/helper';

import PopupProfile from './PopupProfile/index.tsx';
import { NavWrapper } from './styled';

const SidebarNavigator = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isSidebarOpen, setSidebarOpen } = useAppLayout();

  const { data: userDetail } = useAuthInfo();

  const isMatch = useMediaQuery('min-width', '1024px');

  useIsomorphicLayoutEffect(() => {
    setSidebarOpen(isMatch);
  }, [isMatch]);

  return (
    <div className="fixed top-0 bottom-0 left-0">
      <NavWrapper
        className="flex flex-col h-full"
        $minWidth={isSidebarOpen ? Constants.WIDTH_SIDE_BAR : Constants.WIDTH_SIDE_BAR_SMALL}
      >
        <h2
          className={cn(
            'text-[24px] font-[900] pb-[24px]',
            !isSidebarOpen &&
              'bg-white pb-0 px-2 leading-[55px] rounded-[12px] h-[55px] w-[55px] items-center justify-center text-center',
          )}
        >
          {isSidebarOpen ? 'TechPlatform' : 'TP'}
        </h2>
        <SidebarGroup
          listItemClassName={cn(!isSidebarOpen && 'flex items-center justify-center')}
          listClassName={cn(!isSidebarOpen && '!p-0')}
          containerClassName={'flex-1'}
          list={[
            {
              icon: <LuHome color={colors['neutral-500']} size={20} />,
              title: t`home`,
              link: '/',
            },
            // {
            //   icon: <LuBell color={colors['neutral-500']} size={20} />,
            //   title: t`notification`,
            //   link: Routes.NOTIFICATION,
            // },
            {
              icon: <LuCode2 color={colors['neutral-500']} size={20} />,
              title: t`courses`,
              link: Routes.COURSE,
            },
            // {
            //   icon: <BsPostcardHeart color={colors['neutral-500']} size={20} />,
            //   title: t`blog`,
            //   link: Routes.BLOG,
            // },
            // {
            //   icon: <VscIssues color={colors['neutral-500']} size={20} />,
            //   title: t`issues`,
            // },
          ]}
        />
      </NavWrapper>
      <div className="absolute left-0 right-0 px-6 bottom-6">
        {!userDetail ? (
          <Button
            fullWidth
            variant={'primary'}
            onClick={async () => {
              await sleep(200);
              navigate(Routes.AUTH);
            }}
          >
            {t`login`}
          </Button>
        ) : (
          <PopupProfile />
        )}
      </div>
    </div>
  );
};

export default SidebarNavigator;
