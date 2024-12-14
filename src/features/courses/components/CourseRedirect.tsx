import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/Button';
import Image from '@/components/Image';
import { QueryKeys } from '@/constants/enums/QueryKeys.ts';
import { Routes } from '@/constants/Routes.ts';
import useRegisterCourse from '@/features/courses/apis/registerCourse.ts';
import { queryClient } from '@/libs/react-query.ts';
import { CourseDetail } from '@/types/course.ts';
import {
  cn,
  formatMoney,
  isAuthenticationValid,
  replaceDynamicRoute,
  saveNumber,
} from '@/utils/helper.ts';
import RouterHelper from '@/utils/RouterHelper.ts';
import StorageHelper from '@/utils/StorageHelper.ts';

type Props = {
  type?: 'row' | 'col';
};

const CourseRedirect = (props: Props) => {
  const { type = 'col' } = props;
  const { t } = useTranslation();

  const { slug: courseSlug = '' } = useParams();
  const courseDetail = queryClient.getQueryData<CourseDetail>([
    QueryKeys.COURSE_DETAIL_SLUG,
    courseSlug,
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(true);

  const { mutateAsync: registerCourse } = useRegisterCourse({
    courseSlug: courseDetail?.slug,
  });

  const handleRegisterCourse = async () => {
    const isAuthValid = isAuthenticationValid(StorageHelper.getAuthToken());
    if (!isAuthValid) {
      navigate(
        RouterHelper.redirectUrl(Routes.AUTH_LOGIN, encodeURI(location.pathname), {
          refresh: true,
        }),
      );
      return;
    }
    if (courseDetail?.registered) {
      navigate(replaceDynamicRoute(Routes.STUDYING, courseDetail?.slug));
      return;
    }
    if (!courseDetail) {
      navigate(-1);
      return;
    }
    if (courseDetail.price > 0) {
      navigate(replaceDynamicRoute(Routes.PAYMENT_COURSE_DETAILS, courseDetail?.slug ?? ''));
      return;
    }
    await registerCourse({ courseId: courseDetail.id });
    // navigate(
    //   replaceDynamicRoute(
    //     Routes.STUDYING,
    //     courseDetail?.slug,
    //     qs.stringify({ lessonId: courseDetail?.lastLessonId }),
    //   ),
    // );
  };

  return (
    <div
      className={cn('w-1/3 bg-white  lg:block hidden', type === 'row' && 'lg:hidden block w-auto')}
    >
      <div className={cn('border-[1px] p-6 rounded-xl', type === 'row' && 'flex gap-5')}>
        <Image
          data-url={courseDetail?.thumbnailUrl}
          onLoad={() => setIsLoadingThumbnail(false)}
          containerClassName={cn(type === 'row' ? `w-[240px]` : `w-full`)}
          alt="course-image"
          className={cn('rounded-xl w-full h-full', isLoadingThumbnail && 'hidden')}
          src={courseDetail?.thumbnailUrl}
        />
        <Skeleton
          height={200}
          containerClassName={cn('w-[240px] h-[200px]', !isLoadingThumbnail && 'hidden')}
        />
        <div className={cn('px-2 mt-4', type === 'row' && 'flex flex-col justify-between')}>
          <div className="flex items-center justify-between">
            <div className="font-bold">
              {saveNumber(courseDetail?.price) === 0
                ? t`free`
                : `${formatMoney(courseDetail?.price)} VND`}
              {/*<span className="font-normal line-through text-neutral-500">$1,499.00</span>*/}
            </div>
            {/*<span className="font-medium text-red-400">100% off</span>*/}
          </div>
          <Button onClick={handleRegisterCourse} fullWidth variant="primary" className="mt-4">
            {courseDetail?.registered ? t`continueStudying` : t`registerNow`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseRedirect;
