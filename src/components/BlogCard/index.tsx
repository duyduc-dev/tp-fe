import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/helper';

import Image from '../Image';

type Props = {
  thumbnail?: string;
  title?: string;
  description?: string;
  type?: 'large' | 'default';
};

const BlogCard = ({ thumbnail, title, description, type }: Props) => {
  const { t } = useTranslation();

  const cardClasses = cn(
    'rounded-2xl flex',
    type === 'large' ? ' gap-4 max-w-[840px] flex-row-reverse' : ' flex-col items-start gap-1',
  );

  const imageContainerClasses = cn('rounded-2xl', type === 'large' ? 'w-1/2' : 'w-full');

  return (
    <div className={cardClasses}>
      <Image
        className="rounded-2xl object-cover"
        containerClassName={imageContainerClasses}
        source={thumbnail}
      />
      <div className="flex-1 mt-1 p-2">
        <p className="text-neutral-600 text-sm">18.04.2024</p>
        <h1
          className={cn(
            type === 'large' ? 'font-bold text-3xl my-2' : 'font-semibold text-lg line-clamp-2',
          )}
        >
          {title}
        </h1>
        <p className="text-neutral-700 line-clamp-1 mb-2">{description}</p>
        <button className="p-4 py-2 font-semibold text-sm bg-black text-white rounded-xl">
          {t('readMore')}
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
