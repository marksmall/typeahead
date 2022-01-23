import { useCallback } from 'react';

import { throttle } from 'lodash';

export const useThrottle = (callback: any, delay: number): any =>
  useCallback(
    throttle((...args) => callback(...args), delay),
    [delay],
  );
