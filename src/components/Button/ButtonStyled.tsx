import { styled } from 'styled-components';

import { StyledComponentProps } from '@/types/common';

import { RippleContainerProps } from './types';

export const ButtonStyled = styled.button`
  height: 42px;
  position: relative;
  padding: 8px 12px;
  overflow: hidden;
  border-radius: 6px;
  transition: all 0.1s linear;
  border: 1px solid transparent;
  outline: none;
`;

export const RippleContainer = styled.div<StyledComponentProps<RippleContainerProps>>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    background-color: ${(props) => props.$color};
    animation-name: ripple;
    animation-duration: ${(props) => props.$duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;
