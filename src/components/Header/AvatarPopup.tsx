import { FC } from 'react';

import Avatar from '@/components/Avatar';
import Popover, { usePopoverRef } from '@/components/Popover';
import { UserDetail } from '@/types/user.ts';

type Props = {
  data: UserDetail;
};

const AvatarPopup: FC<Props> = ({ data }) => {
  const popoverRef = usePopoverRef();

  const renderPopover = () => {
    return (
      <div className="bg-white rounded-[12px] p-4 py-3 shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
        123
      </div>
    );
  };

  return (
    <Popover
      onClickOutside={() => popoverRef.current?.close()}
      ref={popoverRef}
      placement="bottom-end"
      render={renderPopover}
    >
      <Avatar
        onClick={() => popoverRef.current?.toggle()}
        containerClassName="border cursor-pointer"
        size={36}
        src={data?.profileImage}
      />
    </Popover>
  );
};

export default AvatarPopup;
