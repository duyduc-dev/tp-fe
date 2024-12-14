import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';
import { Routes } from '@/constants/Routes.ts';

import styles from './style.module.scss';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <p className={styles.errorNotification}>{t('403Forbidden')}</p>
        <p className="mb-4  text-gray-900 lg:mb-6 ">{t('forbidden')}</p>
        <p className="mb-8 text-gray-600 lg:mb-12">{t('pageNotFoundMessage')}</p>

        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <div className="flex w-full lg:order-2 lg:w-fit">
            <Button
              className="rounded-lg"
              variant={'primary'}
              fullWidth
              onClick={() => navigate(Routes.ROOT)}
            >
              <p className="text-white">{t('takeMeHome')}</p>
            </Button>
          </div>

          <div className="flex w-full lg:order-1 lg:w-fit">
            <Button
              className="rounded-lg"
              variant={'secondary'}
              fullWidth
              onClick={() => navigate(-1)}
            >
              <p className=" text-gray-700">{t('goBack')}</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
