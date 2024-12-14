import { useTranslation } from 'react-i18next';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoHeartCircleOutline } from 'react-icons/io5';
import { RiApps2Line, RiProductHuntLine } from 'react-icons/ri';

import Button from '@/components/Button';
import LearnProgramingSvg from '@/features/intro/components/LearnProgramingSvg.tsx';
import QuestionOption from '@/features/intro/components/QuestionOption.tsx';
import { CommonProps } from '@/features/intro/types.ts';

const WhyLearnProgramingPage = ({ onNext }: CommonProps) => {
  const { t } = useTranslation();
  return (
    <div className="h-full min-h-screen items-center flex justify-center">
      <div className="animate__animated animate__fadeInUp flex items-center justify-center flex-1">
        <LearnProgramingSvg height={360} />
      </div>
      <div className="flex-1">
        <div className="flex-1 animate__animated animate__fadeInUp max-w-[400px]">
          <QuestionOption
            itemActivatedClassName="bg-yellow-500/30"
            titleClassName="text-yellow-500"
            title="Tại sao bạn muốn học lập trình"
            options={[
              {
                icon: <RiProductHuntLine size={20} />,
                label: 'Trở thành lập trình viên chuyên nghiệp',
              },
              {
                icon: <FaRegMoneyBillAlt size={20} />,
                label: 'Tìm cơ hội ổn định và thu nhập cao',
              },
              { icon: <RiApps2Line size={20} />, label: 'Bổ trợ cho công việc hiện tại' },
              {
                icon: <IoHeartCircleOutline size={20} />,
                label: 'Phục vụ cho đam mê lập trình',
              },
            ]}
          />
          <div className="flex justify-end">
            <Button
              onClick={onNext}
              className="bg-yellow-300/20 text-yellow-900 font-[500]"
            >{t`continue`}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyLearnProgramingPage;
