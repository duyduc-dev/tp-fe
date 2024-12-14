import { ImgHTMLAttributes, memo, useEffect, useState } from 'react';

import { cn } from '@/utils/helper';

type Props = {
  source?: string;
  alt?: string;
  containerClassName?: string;
  fallback?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

const Image = (props: Props) => {
  const {
    source,
    alt,
    containerClassName,
    className,
    fallback = '/assets/placeholder-image-notext.webp',
    ...rest
  } = props;

  const [defaultSource, setDefaultSource] = useState(source ?? fallback);

  const handleError = () => {
    setDefaultSource(fallback);
  };

  useEffect(() => {
    if (source && source !== defaultSource) {
      setDefaultSource(source);
    }
  }, [source]);

  return (
    <div className={containerClassName}>
      <img
        src={defaultSource}
        alt={alt}
        onError={handleError}
        className={cn('w-full h-full object-cover', className)}
        {...rest}
      />
    </div>
  );
};

export default memo(Image);
