import { useTranslation } from 'react-i18next';
import { IoMdTime } from 'react-icons/io';
import { WiTime2, WiTime12 } from 'react-icons/wi';

import Button from '@/components/Button';
import QuestionOption from '@/features/intro/components/QuestionOption.tsx';
import TvSvg from '@/features/intro/components/TvSvg.tsx';
import { CommonProps } from '@/features/intro/types.ts';

const SpendTimePage = ({ onNext }: CommonProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-full min-h-screen flex items-center justify-center ">
      <div className="flex items-center flex-1">
        <div className="animate__animated flex-1 flex items-center justify-center animate__fadeInUp">
          <TvSvg height={340} />
        </div>
        <div className="flex-1">
          <div className="flex-1 animate__animated animate__fadeInUp max-w-[400px]">
            <QuestionOption
              titleClassName="text-blue-500"
              itemActivatedClassName="bg-blue-500/30"
              title="Bạn dành bao nhiêu thời gian để học mỗi ngày ?"
              options={[
                {
                  label: '1 tiếng / ngày',
                  icon: <WiTime2 size={20} />,
                },
                {
                  label: '4 tiếng / ngày',
                  icon: <IoMdTime size={20} />,
                },
                {
                  label: '12 tiếng / ngày ',
                  icon: <WiTime12 size={20} />,
                },
              ]}
            />
            <div className="flex justify-end">
              <Button
                onClick={onNext}
                variant="secondary"
                className="font-[500]"
              >{t`continue`}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendTimePage;
