import { memo, ReactElement, FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './FadeTransition.module.css';

export interface TransitionProps {
  children: ReactElement;
  timeout?: number;
  in: boolean;
  unmountOnExit?: boolean;
}

const FadeTransition: FC<TransitionProps> = (props: TransitionProps) => {
  const { children, timeout = 400, ...restProps } = props;

  return (
    <CSSTransition {...restProps} timeout={timeout} classNames={{ ...styles }}>
      {children}
    </CSSTransition>
  );
};

export default memo(FadeTransition);
