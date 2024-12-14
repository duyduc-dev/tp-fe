import { Dialog as DialogHeadless, Transition } from '@headlessui/react';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { cn } from '@/utils/helper';

export type AppDialogProps = {
  children: ReactNode;
  title?: ReactNode;
  titleClassName?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
  hiddenOnClickOverlay?: boolean;
};

export type DialogRef = {
  open: () => void;
  close: () => void;
};

const Dialog = forwardRef<DialogRef, AppDialogProps>((props, ref) => {
  const {
    title,
    titleClassName,
    children,
    containerClassName,
    wrapperClassName,
    hiddenOnClickOverlay = true,
    onOpen,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    if (!hiddenOnClickOverlay) return;
    setIsOpen(false);

    onClose?.();
  };

  useImperativeHandle(ref, () => ({
    close: () => {
      setIsOpen(false);
      onClose?.();
    },
    open: () => {
      onOpen?.();
      setIsOpen(true);
    },
  }));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <DialogHeadless as="div" className="relative z-[999999]" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className={cn('fixed inset-0 overflow-y-auto', wrapperClassName)}>
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogHeadless.Panel
                className={cn(
                  'relative w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl',
                  containerClassName,
                )}
              >
                {title && (
                  <DialogHeadless.Title
                    className={cn(
                      'text-lg font-RobotoBold leading-6 text-gray-900',
                      titleClassName,
                    )}
                  >
                    {title}
                  </DialogHeadless.Title>
                )}
                {children}
              </DialogHeadless.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogHeadless>
    </Transition>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;
