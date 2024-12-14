import { useTranslation } from 'react-i18next';
import { FaSchool } from 'react-icons/fa6';
import { PiBagSimpleFill, PiStudent } from 'react-icons/pi';

import Button from '@/components/Button';
import QuestionOption from '@/features/intro/components/QuestionOption.tsx';
import QuestionSvg from '@/features/intro/components/QuestionSvg.tsx';
import { CommonProps } from '@/features/intro/types.ts';

const WhoAreYouPage = ({ onNext }: CommonProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-full min-h-screen flex items-center justify-center ">
      <div className="flex items-center flex-1">
        <div className="animate__animated flex-1 flex items-center justify-center animate__fadeInUp">
          <QuestionSvg height={360} />
        </div>
        <div className="flex-1">
          <div className="flex-1 animate__animated animate__fadeInUp max-w-[400px]">
            <QuestionOption
              titleClassName="text-green-500"
              itemActivatedClassName="bg-green-500/30"
              title="Bạn đang là?"
              options={[
                {
                  label: 'Học sinh',
                  icon: <FaSchool size={20} />,
                },
                {
                  label: 'Sinh viên',
                  icon: <PiStudent size={20} />,
                },
                {
                  label: 'Người đi làm',
                  icon: <PiBagSimpleFill size={20} />,
                },
              ]}
            />
            <div className="flex justify-end">
              <Button
                onClick={onNext}
                className="bg-green-300 text-green-900 font-[500]"
              >{t`continue`}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoAreYouPage;
