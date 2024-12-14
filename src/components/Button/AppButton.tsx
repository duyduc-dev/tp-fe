import { forwardRef } from 'react';

import { colors } from '@/constants/colors';
import { cn, hexToRgba } from '@/utils/helper';

import PuffLoader from '../Loading/PuffLoader';
import { ButtonStyled } from './ButtonStyled';
import Ripple from './Ripple';
import { ButtonProps, ButtonVariantTypeObj } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    type = 'button',
    rippleDuration = 1000,
    rippleColor,
    variant = 'default',
    fullWidth,
    className,
    rippleAnimation = true,
    disabled,
    loading,
    loadingMessage,
    ...propsButton
  } = props;

  const classesVariant: ButtonVariantTypeObj = {
    default: '',
    outline: '!border-gray-200',
    primary: 'bg-black text-white font-[500]',
    secondary: 'bg-secondary-100 text-primary-900 font-[500]',
    gradient: 'bg-gradient-to-r from-[#7B7B7B] to-[#151414] text-white font-[500]',
  };

  const rippleColorVariant: ButtonVariantTypeObj = {
    default: hexToRgba(colors.black, 0.3),
    primary: hexToRgba(colors.white, 0.6),
    outline: hexToRgba(colors.black, 0.2),
    secondary: hexToRgba(colors['secondary-400'], 0.5),
    gradient: hexToRgba(colors.white, 0.6),
  };

  const buttonClassesDisabled: ButtonVariantTypeObj = {
    default: 'opacity-80',
    primary: 'opacity-50',
    outline: 'opacity-80',
    secondary: 'opacity-50',
    gradient: 'opacity-50',
  };

  const colorLoader: ButtonVariantTypeObj<string | undefined> = {
    default: undefined,
    outline: colors.black,
    primary: undefined,
    secondary: colors['primary-500'],
    gradient: undefined,
  };

  return (
    <ButtonStyled
      ref={ref}
      type={type}
      {...propsButton}
      disabled={disabled}
      className={cn(
        fullWidth && 'w-full',
        classesVariant[variant],
        disabled && buttonClassesDisabled[variant],
        className,
      )}
    >
      {!loading && children}
      {loading && (
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center gap-2">
            <PuffLoader color={colorLoader[variant]} />
            {loadingMessage && <span className="text-[13px]">{loadingMessage}</span>}
          </div>
        </div>
      )}
      {rippleAnimation && !disabled && (
        <Ripple color={rippleColor || rippleColorVariant[variant]} duration={rippleDuration} />
      )}
    </ButtonStyled>
  );
});

Button.displayName = 'Button';

export default Button;
