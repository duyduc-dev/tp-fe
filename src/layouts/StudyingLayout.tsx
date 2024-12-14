import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import { LuHome, LuList } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

import { BreadcrumbItem } from '@/components/Breadcrumb';
import Button from '@/components/Button';
import LayoutWrapper from '@/components/core/LayoutWrapper.tsx';
import Header from '@/components/Header';
import SidebarLesson from '@/components/SidebarLesson';
import { Routes } from '@/constants/Routes.ts';
import useGetCourseDetailBySlug from '@/features/courses/apis/getCourseDetail.ts';
import useGetLessonDetail from '@/features/studying/apis/getLessonDetail.ts';
import { useQueryString } from '@/hooks/useQueryString.ts';
import { cn, replaceDynamicRoute } from '@/utils/helper.ts';

const StudyingLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();

  const { slug = '' } = useParams();
  const [{ lessonId = '' }, setQueryStr] = useQueryString();
  const { data: lessonDetail } = useGetLessonDetail({
    lessonId: lessonId,
  });
  const { data: courseDetail } = useGetCourseDetailBySlug({ slug });

  const [showLessonList, setShowLessonList] = useState(true);

  const tabs: BreadcrumbItem[] = [
    {
      icon: <LuHome size={20} />,
      link: Routes.ROOT,
      title: t`home`,
    },
    {
      link: replaceDynamicRoute(Routes.COURSE_DETAILS, courseDetail?.slug ?? ''),
      title: courseDetail?.title ?? '',
    },
    {
      link: Routes.ROOT,
      title: lessonDetail?.title ?? '',
      active: true,
    },
  ];

  useEffect(() => {
    if (!lessonId && courseDetail) {
      setQueryStr({ lessonId: courseDetail?.currentLessonId });
    }
  }, [courseDetail, lessonId]);

  useIsomorphicLayoutEffect(() => {
    document.body.classList.add('scroll-disable');
    return () => {
      document.body.classList.remove('scroll-disable');
    };
  }, []);

  return (
    <LayoutWrapper className="min-h-screen h-full bg-neutral-100 overflow-hidden">
      <div className="w-full bg-white border-b border-neutral-100">
        <Header
          showAvatar
          containerLeftClassName="gap-3"
          showLogo
          tabs={tabs}
          renderLeftBefore={() => (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowLessonList((p) => !p)}
                className="text-[13px] !py-0 !h-[32px] flex items-center gap-3"
                variant="secondary"
              >
                <LuList />
                {showLessonList ? t`hiddenSidebarLesson` : t`showSidebarLesson`}
              </Button>
              {lessonDetail?.tpEditorUrl && (
                <Button
                  onClick={() => {
                    lessonDetail?.tpEditorUrl &&
                      // @ts-ignore
                      window.open(lessonDetail?.tpEditorUrl ?? '', '_blank').focus();
                  }}
                  className="text-[13px] !py-0 !h-[32px] flex items-center gap-3"
                  variant="secondary"
                >
                  <AiOutlineCodeSandbox />
                  Open TP-Editor
                </Button>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex bg-white min-h-[calc(100vh_-_72px)] overflow-hidden">
        <div
          className={cn(
            'h-full border-r border-neutral-100 transition-all ',
            !showLessonList && 'hidden',
          )}
        >
          <SidebarLesson />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </LayoutWrapper>
  );
};

export default StudyingLayout;
