import { useTranslation } from 'react-i18next';
import { LuFileEdit } from 'react-icons/lu';

import Button from '@/components/Button';

const LessonAdjust = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute right-4 top-4 bg-white shadow-[rgba(149,157,165,0.2)_0px_8px_24px] px-4 py-1 rounded-[8px]">
      <Button className="!h-auto flex items-center gap-2">
        <LuFileEdit size={18} />
        <span className="text-[13px] font-[500]">{t`editLesson`}</span>
      </Button>
    </div>
  );
};

export default LessonAdjust;
