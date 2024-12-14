import { useTranslation } from 'react-i18next';
import { LuHome } from 'react-icons/lu';

import Breadcrumb from '@/components/Breadcrumb';
import Widget from '@/components/Widget';
import { cn } from '@/utils/helper.ts';

import styles from './style.module.scss';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.container)}>
      <Breadcrumb
        containerClassName="mb-4"
        data={[
          {
            icon: <LuHome size={18} />,
            title: t('home'),
            link: '/',
          },
        ]}
      />

      <Widget title="Bài học gần đây" contentClassName="mt-4 flex flex-wrap gap-4"></Widget>
    </div>
  );
};

export default HomePage;
