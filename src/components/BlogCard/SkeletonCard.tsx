import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

type Props = {
  cards: number;
  containerClassName?: string;
};

export const SkeletonCard = (props: Props) => {
  const { cards, containerClassName } = props;

  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className={containerClassName} key={index}>
        <Skeleton count={1} className="h-[170px]" borderRadius="16px" />
        <Skeleton className="mt-4" width={100} />
        <Skeleton className="" />
        <Skeleton className="my-2" />
        <Skeleton className="" />
        <Skeleton className="mt-2" width={100} borderRadius="12px" height={30} />
      </div>
    ));
};

export const SkeletonLargeCard = () => {
  return (
    <div className="max-w-[840px] w-[840px] flex gap-4">
      <div className="flex-1">
        <Skeleton className="mt-4" width={100} />
        <Skeleton className="" height={30} count={3} />
        <Skeleton className="" height={30} count={1} width={100} />
        <Skeleton count={3} />
        <Skeleton className="mt-2" width={100} borderRadius="12px" height={30} />
      </div>
      <div className="w-1/2">
        <Skeleton count={1} className="h-[250px] max-h-[300px]" borderRadius="16px" />
      </div>
    </div>
  );
};
