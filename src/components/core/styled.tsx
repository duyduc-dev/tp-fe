import { styled } from 'styled-components';

import { StyledComponentProps } from '@/types/common';

type Props = {
  spacingSidebar?: number;
};

export const WrapperContainerPage = styled.div<StyledComponentProps<Props>>`
  margin-left: ${(p) => p.$spacingSidebar}px;
  transition: all 0.1s linear;
`;
