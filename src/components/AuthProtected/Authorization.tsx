import { FC, ReactNode } from 'react';

import useAuthInfo from '@/apis/getAuthInfo.ts';
import { UserRole } from '@/types/user.ts';

type Props = {
  roles: UserRole[];
  children: ReactNode;
};

const Authorization: FC<Props> = (props) => {
  const { roles, children } = props;
  const { data: userDetail } = useAuthInfo();

  const isAuthorization = () => !!userDetail?.userRole && roles.includes(userDetail?.userRole);

  if (!isAuthorization()) return <></>;

  return <>{children}</>;
};

export default Authorization;
