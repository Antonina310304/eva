import { FC, HTMLAttributes, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import styles from './Overlay.module.css';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible?: boolean;
}

const Overlay: FC<OverlayProps> = (props) => {
  const { className, visible, ...restProps } = props;

  return (
    <CSSTransition timeout={400} classNames={{ ...styles }} unmountOnExit in={visible}>
      <div {...restProps} className={cn(styles.overlay, className)} />
    </CSSTransition>
  );
};

export default memo(Overlay);
