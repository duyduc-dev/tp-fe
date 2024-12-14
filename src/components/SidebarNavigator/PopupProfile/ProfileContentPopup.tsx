import { useTranslation } from 'react-i18next';
import { BiLogOutCircle } from 'react-icons/bi';
import { LuSettings, LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import AuthApi from '@/apis/AuthApi.ts';
import Button from '@/components/Button';
import { Routes } from '@/constants/Routes.ts';
import useAppLayout from '@/hooks/useAppLayout.ts';
import { cn } from '@/utils/helper.ts';

const ProfileContentPopup = () => {
  const { setLoadingScreen } = useAppLayout();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const data = [
    {
      icon: <LuUser size={20} />,
      title: 'account',
      onClick: () => {
        navigate(Routes.ACCOUNT);
      },
    },
    {
      icon: <LuSettings size={20} />,
      title: 'setting',
      onClick: () => {
        navigate(Routes.SETTINGS);
      },
    },
    {
      className: 'text-error-500',
      title: 'logout',
      icon: <BiLogOutCircle size={20} />,
      onClick: async () => {
        setLoadingScreen(true);
        await AuthApi.logout();
        setLoadingScreen(false);
        navigate(0);
      },
    },
  ];

  return (
    <div className="bg-white p-1 rounded-[12px] flex flex-col min-w-[160px] shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
      {data.map((item, key) => (
        <Button
          onClick={item.onClick}
          key={`${key}-item`}
          className={cn('flex items-center gap-2 text-[15px]', item.className)}
        >
          {item.icon}
          <p>{t(item.title)}</p>
        </Button>
      ))}
    </div>
  );
};

export default ProfileContentPopup;
