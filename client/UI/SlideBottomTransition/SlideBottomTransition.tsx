import React, { memo, ReactElement, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './SlideBottomTransition.module.css';

export interface TransitionProps {
  children: ReactElement;
  timeout?: number;
  in: boolean;
  unmountOnExit?: boolean;
}

const SlideBottomTransition: FC<TransitionProps> = (props: TransitionProps) => {
  const { children, timeout = 400, ...restProps } = props;

  return (
    <CSSTransition {...restProps} timeout={timeout} classNames={{ ...styles }}>
      {children}
    </CSSTransition>
  );
};

export default memo(SlideBottomTransition);
