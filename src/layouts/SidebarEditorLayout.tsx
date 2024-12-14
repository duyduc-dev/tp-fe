import Split from '@uiw/react-split';
import { PropsWithChildren, useEffect } from 'react';

import useAppHeader from '@/components/Header/useAppHeader.tsx';
import SidebarEditor from '@/components/SidebarEditor';
import { useQueryClientGetLessonDetail } from '@/features/studying/apis/getLessonDetail.ts';
import { cn, isJsonString } from '@/utils/helper.ts';

type Props = PropsWithChildren<{
  containerClassName?: string;
}>;

const SidebarEditorLayout = (props: Props) => {
  const { containerClassName, children } = props;
  const { setDevMode, devMode } = useAppHeader();

  const lessonDetail = useQueryClientGetLessonDetail();

  const isOpenEditorCode = !!(
    lessonDetail &&
    lessonDetail?.code &&
    isJsonString(lessonDetail?.code)
  );

  useEffect(() => {
    if (isOpenEditorCode) {
      setDevMode({ isShowBtn: true });
    } else {
      setDevMode({ isShowBtn: false, isOpenDevMode: false });
    }
  }, [isOpenEditorCode]);

  return (
    <Split className={cn('w-full flex-1', containerClassName)} visible={devMode.isOpenDevMode}>
      <div className="flex-1 h-full min-w-[50%] overflow-y-auto">{children}</div>
      {isOpenEditorCode && <SidebarEditor item={lessonDetail} />}
    </Split>
  );
};
export default SidebarEditorLayout;
