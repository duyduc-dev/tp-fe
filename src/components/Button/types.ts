import { ButtonHTMLAttributes } from 'react';

export type ButtonVariantType = 'primary' | 'outline' | 'default' | 'secondary' | 'gradient';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleDuration?: number;
  rippleColor?: string;
  variant?: ButtonVariantType;
  fullWidth?: boolean;
  rippleAnimation?: boolean;
  loading?: boolean;
  loadingMessage?: string;
}

export type ButtonVariantTypeObj<T = string> = { [key in ButtonVariantType]: T };

export type RippleContainerProps = {
  color: string;
  duration: number;
};

export type RippleItemType = {
  x: number;
  y: number;
  size: number;
};
