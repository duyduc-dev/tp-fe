import { useState } from 'react';

const useCounter = (initNumber = 0) => {
  const [count, _setCount] = useState(initNumber);

  const increment = (num = 1) => {
    _setCount((p) => p + num);
  };

  const decrement = (num = 1) => {
    _setCount((p) => p - num);
  };

  const setCount = (num: number) => _setCount(num);

  return [
    count,
    {
      increment,
      decrement,
      setCount,
    },
  ] as const;
};

export default useCounter;
