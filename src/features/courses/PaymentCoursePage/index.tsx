import { useCopyToClipboard } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { BiChevronLeft } from 'react-icons/bi';
import { LuCopy } from 'react-icons/lu';
import Lottie from 'react-lottie';
import { useNavigate, useParams } from 'react-router-dom';

import CheckAnimation from '@/animation/checked.json';
import Button from '@/components/Button';
import Dialog, { DialogRef } from '@/components/Dialog';
import BallBlurIcon from '@/components/icons/BallBlurIcon.tsx';
import Image from '@/components/Image';
import PuffLoader from '@/components/Loading/PuffLoader.tsx';
import AppTextEditorV2 from '@/components/TextEditorV2';
import AppTooltip from '@/components/Tooltip';
import { colors } from '@/constants/colors.ts';
import { PushNotificationType } from '@/constants/enums/PushNotificationType.ts';
import { Routes } from '@/constants/Routes.ts';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import useGetPaymentCourseSession from '@/features/courses/apis/getPaymentCourseSession.ts';
import LessonContentSession from '@/features/courses/components/LessonContentSession.tsx';
import Container from '@/layouts/partial/Container.tsx';
import { PaymentCoursePushNotification, PaymentCourseStatus } from '@/types/course.ts';
import EventHelper from '@/utils/EventHepler.ts';
import { formatMoney, pad, replaceDynamicRoute, sleep } from '@/utils/helper.ts';

export type DataEventType = {
  isClose?: boolean;
};

const PaymentCoursePage = () => {
  const { slug = '' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: courseDetail, refetch } = useGetCourseDetailBySlug({
    slug,
  });
  const { data: paymentCourseResponse } = useGetPaymentCourseSession({
    token: courseDetail?.id,
  });
  const [_copyValue, setCopyText] = useCopyToClipboard();
  const dialogRef = useRef<DialogRef>(null);
  const dialogPaymentSuccessRef = useRef<DialogRef>(null);

  const handleCopy = async (text?: string) => {
    if (!text) return;
    await setCopyText(text);
  };

  const handleUnlockCourse = async () => {
    dialogRef.current?.open();
  };

  const handleEvent = async ({ detail }: { detail: PaymentCoursePushNotification }) => {
    dialogRef.current?.close();
    if (detail.type === PushNotificationType.PAYMENT_COURSE) {
      if (detail.status === PaymentCourseStatus.SUCCESS) {
        await refetch();
        await sleep(500);
        dialogPaymentSuccessRef.current?.open();
      }
    }
  };

  // useLayoutEffect(() => {
  //   if ((courseDetail && saveNumber(courseDetail?.price) === 0) || courseDetail?.registered) {
  //     navigate(Routes.COURSE);
  //   }
  // }, [courseDetail]);

  useEffect(() => {
    EventHelper.subscriber<PaymentCoursePushNotification>('dialog:handleDataPayment', handleEvent);
    return () => EventHelper.remove('dialog:handleDataPayment', handleEvent);
  }, []);

  return (
    <>
      <div className="pt-10">
        <div>
          <Container>
            <div>
              <h1 className="font-RobotoMedium text-[24px]">
                {t`unlockCourse`}{' '}
                <span className="text-blue-500 text-[32px]">{courseDetail?.title}</span>
              </h1>
              <div className="flex flex-col gap-5 mt-4 lg:flex-row">
                <div className="flex-1">
                  {courseDetail?.content && (
                    <AppTextEditorV2 initialValue={JSON.parse(courseDetail?.content ?? '[]')} />
                  )}
                </div>
                <div className="backdrop-blur-md  flex-1 p-4 rounded-[12px]">
                  <div className="flex flex-col justify-between">
                    <h3 className="text-[18px] font-RobotoBold">Thanh toán</h3>
                    <div className="flex items-center justify-between px-4 my-5">
                      <p className="text-[18px] font-RobotoMedium text-neutral-500">{t`totalMoney`}</p>
                      <div className="text-[28px] font-RobotoBold text-blue-500">
                        {formatMoney(courseDetail?.price, 0)} VND
                      </div>
                    </div>
                    <Button fullWidth variant="primary" onClick={handleUnlockCourse}>
                      {t`unlockNow`}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <div className="absolute bottom-0 left-0 z-[-1]">
            <img className="max-h-[360px]" src="/assets/ball-haft.png" alt="" />
          </div>
          <div className="absolute top-0 right-0 z-[-1]">
            <BallBlurIcon />
          </div>
          <div className="absolute top-1/4 left-1/2 z-[-1]">
            <BallBlurIcon />
          </div>
        </div>
        <Container>
          <LessonContentSession />
        </Container>
      </div>
      <Dialog
        ref={dialogRef}
        containerClassName="p-0 !rounded-none max-w-screen"
        wrapperClassName="max-h-screen min-h-screen min-w-screen  !max-w-screen [&>div]:block [&>div]:p-0 overflow-hidden"
      >
        <div className="w-full max-h-screen min-h-screen p-4 overflow-y-scroll min-w-screen">
          <Button
            variant="outline"
            tabIndex={-1}
            onClick={() => {
              dialogRef.current?.close();
            }}
            className="flex items-center gap-1 text-[15px] !h-auto !py-2"
          >
            <BiChevronLeft size={24} />
            {t`back`}
          </Button>
          <Container containerClassName="h-full mt-4">
            <div className="flex flex-col-reverse h-full gap-4 lg:flex-row ">
              <div className="bg-neutral-50 rounded-[12px] px-4 py-5 min-w-[360px]">
                <p className="text-[14px] mb-3 font-RobotoMedium">{t`transferVieQR`}</p>
                <Image
                  src={paymentCourseResponse?.qrDataUrl}
                  containerClassName="w-[130px] h-[130px] mx-auto"
                />
                <div className="flex flex-col gap-2 mt-4">
                  <div className="mt-2">
                    <p className="text-[14px] font-RobotoMedium mb-1">{t`accountNumber`}:</p>
                    <div className="p-3 bg-neutral-100 rounded-[10px] text-[14px] flex items-center justify-between">
                      <p>{paymentCourseResponse?.accountNo}</p>
                      <Button
                        onClick={() => handleCopy(paymentCourseResponse?.accountNo)}
                        data-tooltip-id="account-number"
                        data-tooltip-content={`${t`copy`} ${t`accountNumber`}`}
                        className="!h-auto !p-0"
                      >
                        <LuCopy />
                      </Button>
                      <AppTooltip id="account-number" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-[14px] font-RobotoMedium mb-1">{t`accountName`}:</p>
                    <div className="p-3 bg-neutral-100 rounded-[10px] text-[14px] flex items-center justify-between ">
                      <p>{paymentCourseResponse?.accountName}</p>
                      <Button
                        onClick={() => handleCopy(paymentCourseResponse?.accountName)}
                        data-tooltip-id="accountName"
                        data-tooltip-content={`${t`copy`} ${t`accountName`}`}
                        className="!h-auto !p-0"
                      >
                        <LuCopy />
                      </Button>
                      <AppTooltip id="accountName" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-[14px] font-RobotoMedium mb-1">{t`transferContent`}:</p>
                    <div className="p-3 bg-neutral-100 rounded-[10px] text-[14px] flex items-center justify-between text-orange-500">
                      <p>{paymentCourseResponse?.addInfo}</p>
                      <Button
                        onClick={() => handleCopy(paymentCourseResponse?.addInfo)}
                        data-tooltip-id="addInfo"
                        data-tooltip-content={`${t`copy`} ${t`transferContent`}`}
                        className="!h-auto !p-0"
                      >
                        <LuCopy />
                      </Button>
                      <AppTooltip id="addInfo" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-[24px] font-RobotoMedium">
                  {t`transfer`} {t`courses`}{' '}
                  <span className="text-blue-500">{courseDetail?.title}</span>
                </h1>
                <div className="mt-5 bg-neutral-50 p-4 rounded-[12px] ">
                  <p>{t`awaitingPayment`}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <PuffLoader color={colors.black} size={32} />
                    <Countdown
                      autoStart
                      onComplete={() => {
                        dialogRef.current?.close();
                      }}
                      date={Date.now() + 600000}
                      renderer={({ minutes, seconds }) => (
                        <span className="text-[18px] font-RobotoMedium">{`${pad(minutes)}:${pad(seconds)}`}</span>
                      )}
                    />
                  </div>
                </div>
                <div className="mt-3 bg-neutral-50 p-4 rounded-[12px] flex items-center justify-between">
                  <p>{t`price`}</p>
                  <div className="flex items-center gap-4 px-4 text-blue-900 font-RobotoBold text-[18px]">
                    <p>{formatMoney(paymentCourseResponse?.amount, 0)} VND</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p>&#9679; Cách chuyển khoản bằng QR</p>
                  <ul className="mt-2 ml-5 text-[15px] [&>*]:mb-1">
                    <li>Bước 1: Mở app ngân hàng và quét mã QR.</li>
                    <li>
                      Bước 2: Đảm bảo nội dung chuyển khoản là{' '}
                      <span className="text-blue-500 font-RobotoMedium">
                        {paymentCourseResponse?.addInfo}
                      </span>
                    </li>
                    <li>Bước 3: Thực hiện thanh toán.</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p>
                    &#9679; Lưu ý: Nếu gặp vấn đề gì trong quá trình thanh toán hãy liên hệ qua
                    email:{' '}
                    <span className="text-[18x] text-blue-500 font-RobotoBold">
                      techplaform.dev@gmail.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Dialog>
      <Dialog hiddenOnClickOverlay={false} ref={dialogPaymentSuccessRef}>
        <Lottie
          width={150}
          options={{
            loop: false,
            animationData: CheckAnimation,
          }}
        />
        <p className="text-center font-RobotoBold mb-6">
          Mua thành công khoá học &quot;{courseDetail?.title}&quot;
        </p>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              dialogPaymentSuccessRef.current?.close();
              navigate(replaceDynamicRoute(Routes.STUDYING, courseDetail?.slug ?? ''));
            }}
            variant="primary"
          >{t`continue`}</Button>
        </div>
      </Dialog>
    </>
  );
};

export default PaymentCoursePage;
