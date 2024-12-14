import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import CheckAnimation from '@/animation/checked.json';
import useAuthInfo from '@/apis/getAuthInfo.ts';
import Button from '@/components/Button';
import Dialog, { DialogRef } from '@/components/Dialog';
import { Routes } from '@/constants/Routes.ts';
import { useUpdateUserSurvey } from '@/features/intro/apis/updateUserSurvey.ts';
import SpendTimePage from '@/features/intro/SpendTimePage.tsx';
import WelcomePage from '@/features/intro/WelcomePage.tsx';
import WhoAreYouPage from '@/features/intro/WhoAreYouPage.tsx';
import WhyLearnProgramingPage from '@/features/intro/WhyLearnProgramingPage.tsx';
import YourExperiencePage from '@/features/intro/YourExperiencePage.tsx';
import useAppLayout from '@/hooks/useAppLayout.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';

type Step =
  | 'welcome'
  | 'who-are-you'
  | 'your-experience'
  | 'why-learn-programing'
  | 'spent-time-daily';

type Params = {
  step: Step;
};

const IntroDetail = () => {
  const [{ step }, setQueryString] = useQueryString<Params>({ step: 'welcome' });
  const navigate = useNavigate();
  const { setLoadingScreen } = useAppLayout();
  const { t } = useTranslation();
  const { mutateAsync: updateSurvey } = useUpdateUserSurvey();
  const { refetch } = useAuthInfo();
  const dialogRef = useRef<DialogRef>(null);

  const setStep = (s: Step) => {
    setQueryString({
      step: s,
    });
  };

  const handleFinish = async () => {
    try {
      setLoadingScreen(true);
      await updateSurvey({});
      await refetch();
      dialogRef.current?.open();
      setLoadingScreen(false);
    } catch (error) {
      setLoadingScreen(false);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!step) setStep('welcome');
  }, [step]);

  const page: { [key in Step]: ReactNode } = {
    welcome: <WelcomePage onNext={() => setStep('who-are-you')} />,
    'who-are-you': <WhoAreYouPage onNext={() => setStep('your-experience')} />,
    'your-experience': <YourExperiencePage onNext={() => setStep('why-learn-programing')} />,
    'why-learn-programing': <WhyLearnProgramingPage onNext={() => setStep('spent-time-daily')} />,
    'spent-time-daily': <SpendTimePage onNext={handleFinish} />,
  };

  return (
    <div>
      {page[step] ?? page['welcome']}

      <Dialog hiddenOnClickOverlay={false} ref={dialogRef}>
        <Lottie
          width={150}
          options={{
            loop: false,
            animationData: CheckAnimation,
          }}
        />
        <p className="text-center font-RobotoBold mb-6">Hãy tiếp tục khám phá Techplatoform nhé!</p>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              dialogRef.current?.close();
              navigate(Routes.ROOT);
            }}
            variant="primary"
          >{t`continue`}</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default IntroDetail;
