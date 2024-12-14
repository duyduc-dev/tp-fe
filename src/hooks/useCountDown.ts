import { useState } from 'react';

import useCounter from './useCounter';
import useInterval from './useInterval';

type Props = {
  countStart: number;
  countStop?: number;
  intervalMs?: number;
};

export type UseCountDownAction = {
  readonly start: () => void;
  readonly stop: () => void;
  readonly reset: () => void;
  readonly isCounting: boolean;
};

type UseCountDownReturn = [number, UseCountDownAction];

const useCountDown = ({
  countStart,
  countStop = 0,
  intervalMs = 1000,
}: Props): UseCountDownReturn => {
  const [currentCount, apiCounter] = useCounter(countStart);
  const [isCounting, setIsCounting] = useState(false);
  const start = () => {
    setIsCounting(true);
  };

  const stop = () => {
    setIsCounting(false);
  };

  const reset = () => {
    setIsCounting(false);
    apiCounter.setCount(countStart);
  };

  useInterval(
    () => {
      if (currentCount === countStop) {
        stop();
        return;
      }
      apiCounter.decrement();
    },
    isCounting ? intervalMs : null,
  );

  return [currentCount, { start, stop, reset, isCounting }] as const;
};

export default useCountDown;
