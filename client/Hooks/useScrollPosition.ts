import { useCallback, useEffect } from 'react';

export interface Position {
  x: number;
  y: number;
}

export type Callback = (position: Position) => void;

const useScrollPosition = (callback: Callback): void => {
  const handleScroll = useCallback(() => {
    callback({
      x: window.scrollX,
      y: window.scrollY,
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
};

export default useScrollPosition;
