import { useTranslation } from 'react-i18next';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import Avatar from '@/components/Avatar';

const SettingAccountPage = () => {
  const { data: userDetail } = useAuthInfo();
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h3 className="text-[28px] font-RobotoMedium">{t`account`}</h3>
      <div className="mt-4">
        <Avatar size={72} src={userDetail?.profileImage} />
      </div>
    </div>
  );
};

export default SettingAccountPage;
