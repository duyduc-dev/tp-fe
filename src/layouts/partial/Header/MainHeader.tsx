import { useScrollPosition } from 'hooks-react-custom';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import ListRender from '@/components/ListRender';
import Popover, { usePopoverRef } from '@/components/Popover';
import ProfileContentPopup from '@/components/SidebarNavigator/PopupProfile/ProfileContentPopup.tsx';
import { Routes } from '@/constants/Routes.ts';
import Container from '@/layouts/partial/Container.tsx';
import { cn } from '@/utils/helper.ts';

type Nav = {
  title: string;
  link?: string;
  externalUrl?: string;
};

const MainHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const popoverRef = usePopoverRef();

  const { data: userDetail } = useAuthInfo();

  const scrollPosition = useScrollPosition();

  const nav: Nav[] = [
    {
      title: 'courses',
      link: Routes.COURSE,
    },
    {
      title: 'TP-Editor',
      externalUrl: 'https://editor.techplatform.click/editor/vanilajs',
    },
    {
      title: 'TP-CV',
      externalUrl: 'https://designhub.techplatform.click',
    },
  ];

  return (
    <header className="h-[64px] flex items-center fixed top-0 left-0 right-0 z-[100]">
      <div className="absolute top-0 left-0 right-0 bottom-0  backdrop-blur-[6px]  z-[-1]"></div>
      <Container className="flex items-center justify-between">
        <Link to={Routes.ROOT} className="text-[22px] -tracking-tighter	font-RobotoBold ">
          Techplatform
        </Link>
        <div></div>
        <div className="flex items-center">
          <ListRender
            containerClassName="flex items-center gap-8 mr-6"
            data={nav}
            renderItem={(item) => (
              <>
                {item?.link && (
                  <NavLink
                    to={item?.link ?? ''}
                    style={{
                      textShadow: 'unset',
                    }}
                    className={({ isActive }) =>
                      cn(
                        'text-[14px] font-RobotoMedium drop-shadow text-neutral-500 transition-all',
                        isActive && 'text-black',
                        scrollPosition >= 92 && 'text-black/70',
                      )
                    }
                  >
                    {t(item.title)}
                  </NavLink>
                )}
                {item?.externalUrl && (
                  <a
                    target={'_blank'}
                    style={{
                      textShadow: 'unset',
                    }}
                    href={item.externalUrl}
                    className={
                      'text-[14px] no-underline font-RobotoMedium drop-shadow text-neutral-500 transition-all'
                    }
                    rel="noreferrer"
                  >
                    {t(item.title)}
                  </a>
                )}
              </>
            )}
          />
          {!userDetail ? (
            <Button
              className="!h-auto !py-2 !px-6 !rounded-[12px] font-RobotoMedium text-[14px] ml-6"
              variant="primary"
              onClick={() => navigate(Routes.AUTH_LOGIN)}
            >{t`login`}</Button>
          ) : (
            <Popover
              placement="bottom-end"
              onClickOutside={() => popoverRef.current?.close()}
              ref={popoverRef}
              render={() => <ProfileContentPopup />}
            >
              <Avatar
                onClick={() => popoverRef.current?.open()}
                containerClassName="border border-neutral-100 cursor-pointer"
                src={userDetail.profileImage}
              />
            </Popover>
          )}
        </div>
      </Container>
    </header>
  );
};

export default MainHeader;
