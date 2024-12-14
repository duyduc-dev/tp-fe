import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

import { cn, formatDate } from '@/utils/helper';

import Image from '../Image';

type Props = {
  thumbnail?: string;
  title?: string;
  link: string;
};

const LessonCard = (props: Props) => {
  const { thumbnail, title, link } = props;
  const { t } = useTranslation();

  const [loadImg, setLoadImg] = useState(true);

  return (
    <Link to={link} className="mb-4">
      <div>
        <Image
          onLoad={() => {
            setLoadImg(false);
          }}
          containerClassName={cn('w-[340px] h-[200px]', loadImg && 'hidden')}
          className="rounded-[12px] object-cover"
          source={thumbnail}
        />
        <Skeleton width={300} height={180} containerClassName={cn(!loadImg && 'hidden')} />
      </div>
      <div className="mt-2">
        <h5 className="text-[16px] font-[600]">{title}</h5>
        <p className="text-neutral-600 text-[14px]">
          &#x25CF;{' '}
          {t(`viewedAt`, {
            time: formatDate(new Date(), 'HH:mm'),
          })}
        </p>
      </div>
    </Link>
  );
};

export default LessonCard;
