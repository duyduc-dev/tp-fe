import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LuBox, LuSettings } from 'react-icons/lu';

import Button from '@/components/Button';
import useAppHeader from '@/components/Header/useAppHeader.tsx';
import ListRender from '@/components/ListRender';
import Popover, { PopoverRef } from '@/components/Popover';
import ToggleSwitch from '@/components/ToggleSwitch';
import { cn } from '@/utils/helper.ts';

const DevModeEditorOptions = () => {
  const { devMode, setDevMode } = useAppHeader();
  const { t } = useTranslation();

  const popoverRef = useRef<PopoverRef>(null);

  const options = [
    {
      title: 'autoCompiler',
      isToggle: true,
      defaultValue: true,
    },
    {
      title: 'closeDevMode',
      className: 'text-error-500',
      onClick: () => {
        setDevMode({ isOpenDevMode: false });
        popoverRef?.current?.close();
      },
    },
  ];

  const handleClick = () => {
    if (devMode.isOpenDevMode) {
      popoverRef.current?.open();
      return;
    }

    setDevMode({ isOpenDevMode: true });
  };

  const renderPopover = () => {
    return (
      <div className="bg-white py-2 rounded-[12px] shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
        <ListRender
          data={options}
          renderItem={(item) => (
            <button
              onClick={item.onClick}
              className={cn('flex items-center gap-4 text-[14px] px-4 py-2 w-full', item.className)}
            >
              <span>{t(item.title)}</span>
              {item.isToggle && (
                <ToggleSwitch
                  defaultValue={item.defaultValue}
                  onChange={(active) => setDevMode({ isAutoCompiler: active })}
                />
              )}
            </button>
          )}
        />
      </div>
    );
  };

  return (
    <Popover
      placement="bottom-end"
      onClickOutside={() => popoverRef.current?.close()}
      ref={popoverRef}
      render={renderPopover}
    >
      <Button className="text-[13px] !py-0 !h-[32px]" onClick={handleClick} variant={'secondary'}>
        <div className="flex items-center gap-2">
          {!devMode.isOpenDevMode ? <LuBox size={16} /> : <LuSettings size={16} />}
          {!devMode.isOpenDevMode ? t`devMode` : t('devModeOptions')}
        </div>
      </Button>
    </Popover>
  );
};

export default DevModeEditorOptions;
