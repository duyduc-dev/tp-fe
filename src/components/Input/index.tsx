import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/helper';

import style from './input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClassName?: string;
  containerInputClassName?: string;
  errorMessage?: string;
  touched?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    rightIcon,
    leftIcon,
    containerClassName,
    containerInputClassName,
    errorMessage,
    touched,
    ...propsInput
  } = props;

  return (
    <div className={cn(containerClassName)}>
      <div
        className={cn(
          'px-4 flex items-center py-3 bg-gray-100 rounded-md gap-2 border border-gray-100',
          style.containerInput,
          errorMessage && style.errorMessage,
          touched && !errorMessage && style.touchedInput,
          containerInputClassName,
        )}
      >
        {leftIcon}
        <input
          ref={ref}
          autoComplete="off"
          spellCheck="false"
          {...propsInput}
          className={cn(style.input, className)}
        />
        {rightIcon}
      </div>
      {errorMessage && (
        <span className="text-[13px] text-error-500 font-[500]">{errorMessage}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
