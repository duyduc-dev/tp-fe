import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, ms: number | null) => {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (ms === null) {
      return;
    }

    const id = setInterval(() => {
      callbackRef.current();
    }, ms);

    return () => {
      clearInterval(id);
    };
  }, [ms]);
};

export default useInterval;
