import PuffLoader from '@/components/Loading/PuffLoader.tsx';
import useAppLayout from '@/hooks/useAppLayout.ts';
import { cn } from '@/utils/helper.ts';

const LoadingScreen = () => {
  const { isLoadingScreen } = useAppLayout();

  return (
    <div
      className={cn(
        'fixed top-0 left-0 transition-all right-0 bottom-0 z-[99999] bg-[rgba(0,0,0,0.5)] flex items-center justify-center',
        !isLoadingScreen && 'hidden',
      )}
    >
      <PuffLoader size={50} />
    </div>
  );
};

export default LoadingScreen;
