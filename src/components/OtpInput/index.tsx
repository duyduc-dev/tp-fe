import { forwardRef, useImperativeHandle, useState } from 'react';
import { default as ReactOtpInput } from 'react-otp-input';

import { cn } from '@/utils/helper';

import Input from '../Input';

type Props = {
  onChange?: (text: string) => void;
  containerClassName?: string;
  numInputs?: number;
  autoFocus?: boolean;
};

export type OtpInputRef = {
  clear: () => void;
  getValue: () => string;
  focus: () => void;
  blur: () => void;
};

const OtpInput = forwardRef<OtpInputRef, Props>((props, ref) => {
  const { autoFocus = true, containerClassName, numInputs = 6, onChange } = props;
  const [value, setValue] = useState('');

  const [focus, setFocus] = useState(autoFocus);

  const handleChange = (text: string) => {
    setValue(text);
    onChange?.(text);
  };

  useImperativeHandle(
    ref,
    () => ({
      clear: () => setValue(''),
      getValue: () => value,
      focus: () => setFocus(true),
      blur: () => setFocus(false),
    }),
    [value],
  );

  return (
    <ReactOtpInput
      containerStyle={cn('gap-2', containerClassName)}
      inputStyle={cn('text-[20px] font-[600]')}
      value={value}
      shouldAutoFocus={focus}
      onChange={handleChange}
      numInputs={numInputs}
      renderInput={(props) => <Input {...props} />}
    />
  );
});

OtpInput.displayName = 'OtpInput';

export default OtpInput;
