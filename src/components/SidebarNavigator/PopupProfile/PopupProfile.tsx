import useAuthInfo from '@/apis/getAuthInfo.ts';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Popover, { usePopoverRef } from '@/components/Popover';
import useAppLayout from '@/hooks/useAppLayout.ts';

import ProfileContentPopup from './ProfileContentPopup.tsx';

const PopupProfile = () => {
  const ref = usePopoverRef();
  const { data: userDetail } = useAuthInfo();
  const { isSidebarOpen } = useAppLayout();

  return (
    <Popover
      placement="top-end"
      onClickOutside={() => ref.current?.close()}
      ref={ref}
      render={() => <ProfileContentPopup />}
    >
      <Button
        fullWidth
        onClick={() => ref.current?.toggle()}
        className="flex items-center !h-auto px-2 py-3 bg-white rounded-[12px] gap-2 !border-none"
      >
        <Avatar src={userDetail?.profileImage} size={28} />
        {isSidebarOpen && (
          <div className="flex-1">
            <p className="font-[500] text-center text-[13px]">
              {userDetail?.firstName} {userDetail?.lastName}
            </p>
          </div>
        )}
      </Button>
    </Popover>
  );
};

export default PopupProfile;
