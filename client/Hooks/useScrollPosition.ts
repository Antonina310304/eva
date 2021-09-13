import { useCallback, useEffect, useRef } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface Positions {
  previous: Position;
  current: Position;
}

export type Callback = (positions: Positions) => void;

const useScrollPosition = (callback: Callback): void => {
  const previous = useRef({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    const current = { x: window.scrollX, y: window.scrollY };

    callback({ previous: previous.current, current });

    previous.current = current;
  }, [callback]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });
};

export default useScrollPosition;
