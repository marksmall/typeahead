import { useCallback } from 'react';

import { debounce } from 'lodash';

export const useDebounce = (callback: any, delay: number): any =>
  useCallback(
    debounce((...args) => callback(...args), delay),
    [delay],
  );
