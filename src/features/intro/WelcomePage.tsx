import useAuthInfo from '@/apis/getAuthInfo.ts';
import Button from '@/components/Button';
import { colors } from '@/constants/colors.ts';
import { WelcomeSvg } from '@/features/intro/components/WelcomeSvg.tsx';
import { CommonProps } from '@/features/intro/types.ts';

const WelcomePage = ({ onNext }: CommonProps) => {
  const { data: userDetail } = useAuthInfo();

  return (
    <div className="flex items-center justify-center h-full min-h-screen">
      <div className="animate__animated animate__fadeIn ">
        <WelcomeSvg />
      </div>
      <div className="flex-1 text-center animate__animated  animate__fadeInUp">
        <p className="font-[500] text-center text-[18px] mb-2">
          Xin chào, <span className="text-orange-500">{userDetail?.firstName} !</span>
        </p>
        <p className="text-center ">
          Chào mừng bạn đã đến với{' '}
          <span className="text-orange-500 font-[500]">
            TechPlatform - Ứng dụng Web học lập trình
          </span>
        </p>
        <p className="text-center mb-2">Nơi học lập trình miễn phí, hiệu quả và thiết thực !</p>
        <p className="text-center">Để hoàn thiện lộ trình cá nhân</p>
        <p className="mb-2">Hãy giúp chúng mình trả lời một vài câu hỏi nhé!</p>
        <div className="flex justify-center mt-6">
          <Button
            onClick={onNext}
            rippleColor={colors['orange-400']}
            className="bg-orange-400 text-white mx-auto"
          >
            Bắt đầu khám phá
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
