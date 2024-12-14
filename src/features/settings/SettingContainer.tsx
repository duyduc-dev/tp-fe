import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import ListRender from '@/components/ListRender';
import { Routes } from '@/constants/Routes.ts';
import Container from '@/layouts/partial/Container.tsx';
import { cn } from '@/utils/helper.ts';

const SettingContainer = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const data = [
    {
      title: t`account`,
      link: Routes.SETTINGS_ACCOUNT,
    },
    {
      title: t`security`,
      link: Routes.SETTINGS_SECURITY,
    },
  ];

  return (
    <div className="pt-[74px] min-h-screen relative">
      <Container className="flex gap-2 h-full relative">
        <div className=" h-full min-h-screen sticky top-[0px]">
          <ListRender
            containerClassName="p-4 w-full min-w-[240px]"
            data={data}
            renderItem={(item) => (
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  cn('text-[15px] block mb-5', isActive && ' font-RobotoMedium text-blue-500')
                }
              >
                {item.title}
              </NavLink>
            )}
          />
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};

export default SettingContainer;
