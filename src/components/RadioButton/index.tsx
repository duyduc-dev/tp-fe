import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { useState } from 'react';
import { GoCheckCircleFill, GoCircle, GoXCircleFill } from 'react-icons/go';

import { colors } from '@/constants/colors.ts';

type Props = {
  active?: boolean;
  type?: 'success' | 'error';
  size?: number;
};

const RadioButton = (props: Props) => {
  const { active, type = 'success', size = 24 } = props;

  const [isActive, setIsActive] = useState(active);

  useIsomorphicLayoutEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div onClick={() => setIsActive((p) => !p)} style={{ width: size, height: size }}>
      {type === 'success' && isActive && (
        <GoCheckCircleFill color={colors['success-500']} size={size} />
      )}
      {type === 'error' && isActive && <GoXCircleFill color={colors['error-500']} size={size} />}
      {!isActive && <GoCircle color={colors['neutral-500']} size={size} />}
    </div>
  );
};

export default RadioButton;
