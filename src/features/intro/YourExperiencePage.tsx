import { useTranslation } from 'react-i18next';
import { BsLightbulb, BsLightbulbOff } from 'react-icons/bs';
import { MdOutlineLightMode } from 'react-icons/md';

import Button from '@/components/Button';
import FixedComputerSvg from '@/features/intro/components/FixedComputerSvg.tsx';
import QuestionOption from '@/features/intro/components/QuestionOption.tsx';
import { CommonProps } from '@/features/intro/types.ts';

const YourExperiencePage = ({ onNext }: CommonProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-full min-h-screen flex items-center justify-center ">
      <div className="flex-1 items-center justify-center animate__animated animate__fadeInUp flex">
        <FixedComputerSvg height={320} />
      </div>
      <div className="flex-1 animate__animated animate__fadeInUp">
        <div className="flex-1 max-w-[400px]">
          <QuestionOption
            titleClassName="text-error-600"
            itemActivatedClassName="bg-red-500/30"
            title={'Bạn đã có kinh nghiệm về lập trình chưa?'}
            options={[
              {
                icon: <BsLightbulbOff />,
                label: 'Chưa tiếp xúc bao giờ',
              },
              {
                icon: <BsLightbulb />,
                label: 'Mới tiếp xúc chưa lâu',
              },
              {
                icon: <MdOutlineLightMode />,
                label: 'Đã có kinh nghiệm lâu năm trong nghề',
              },
            ]}
          />
          <div className="flex justify-end">
            <Button
              onClick={onNext}
              className="bg-red-200 text-red-900 font-[500]"
            >{t`continue`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourExperiencePage;
