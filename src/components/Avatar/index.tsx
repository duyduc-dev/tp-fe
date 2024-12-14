import { FaCircleUser } from 'react-icons/fa6';

import Image from '@/components/Image';
import { cn } from '@/utils/helper.ts';

type Props = {
  size?: number;
  src?: string;
  containerClassName?: string;
  onClick?: () => void;
};

const Avatar = (props: Props) => {
  const { size = 38, src, containerClassName, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size }}
      className={cn('overflow-hidden rounded-full text-neutral-500', containerClassName)}
    >
      {src && <Image containerClassName="w-full h-full" className="object-cover" src={src} />}
      {!src && <FaCircleUser size={size} />}
    </div>
  );
};

export default Avatar;
