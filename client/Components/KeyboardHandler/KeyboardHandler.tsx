import { FC, memo, ReactElement } from 'react';

import useKeyboardEvents from '@Hooks/useKeyboardEvents';

export type Handler = (e: KeyboardEvent) => void;

export interface KeyboardHandlerProps {
  children: ReactElement;
  onEscape?: Handler;
  onArrowLeft?: Handler;
  onArrowRight?: Handler;
}

const KeyboardHandler: FC<KeyboardHandlerProps> = (props) => {
  const { children, onEscape, onArrowLeft, onArrowRight } = props;

  useKeyboardEvents({ onEscape, onArrowLeft, onArrowRight });

  return children;
};

export default memo(KeyboardHandler);
