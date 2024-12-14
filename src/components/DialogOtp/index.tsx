import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useCountDown from '@/hooks/useCountDown';
import { pad } from '@/utils/helper';

import Button from '../Button';
import Dialog, { AppDialogProps, DialogRef } from '../Dialog/AppDialog';
import OtpInput, { OtpInputRef } from '../OtpInput';

type Props = {
  onSend?: (text: string) => void;
  onChange?: (text: string) => void;
  onResend?: () => void;
  loading?: boolean;
} & Omit<AppDialogProps, 'children'>;

export type DialogOtpRef = {
  startCount: () => void;
  resetCount: () => void;
  stopCount: () => void;
  clearOTP: () => void;
  focus: () => void;
  blur: () => void;
} & DialogRef;

const DialogOtp = forwardRef<DialogOtpRef, Props>((props, ref) => {
  const { onSend, onChange, onResend, loading, ...rest } = props;
  const { t } = useTranslation();
  const [count, apiCount] = useCountDown({ countStart: 60 });
  const otpInputRef = useRef<OtpInputRef>(null);
  const dialogRef = useRef<DialogRef>(null);

  const handleOtpChange = (text: string) => {
    onChange?.(text);
    if (text.length === 6) {
      onSend?.(text);
    }
  };

  useImperativeHandle(ref, () => ({
    close: () => dialogRef.current?.close(),
    open: () => dialogRef.current?.open(),
    resetCount: () => apiCount.reset(),
    startCount: () => apiCount.start(),
    stopCount: () => apiCount.stop(),
    clearOTP: () => otpInputRef.current?.clear(),
    focus: () => otpInputRef.current?.focus(),
    blur: () => otpInputRef.current?.blur(),
  }));

  return (
    <Dialog ref={dialogRef} title={t`enterTheOTP`} {...rest}>
      <h3 className="text-[14px]">{t`pleaseEnterTheOtpSentToYourEmail`}</h3>
      <OtpInput
        ref={otpInputRef}
        onChange={handleOtpChange}
        containerClassName="justify-between my-4"
      />
      <Button
        loading={loading}
        rippleAnimation={false}
        onClick={onResend}
        className="min-w-[110px]"
        disabled={count !== 0}
        variant="secondary"
      >
        {t`resend`} {count > 0 && `(${pad(count)})`}
      </Button>
    </Dialog>
  );
});

DialogOtp.displayName = 'DialogOtp';

export default DialogOtp;
