import { styled } from 'styled-components';

import { StyledComponentProps } from '@/types/common';

type Props = {
  minWidth: number;
};

export const NavWrapper = styled.nav<StyledComponentProps<Props>>`
  min-width: ${(p) => p.$minWidth}px;
  padding: 16px;
  transition: all 0.2s linear;
`;
