import React, { FC, ReactChild, memo } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import cn from 'classnames';

import styles from './Scroller.module.css';

export interface ScrollerProps {
  className?: string;
  space?: number;
  children: ReactChild | ReactChild[];
}

const Scroller: FC<ScrollerProps> = (props) => {
  const { className, children, space = 0, ...restProps } = props;

  return (
    <Scrollbar
      {...restProps}
      className={cn(styles.scroller, className)}
      noScrollX
      trackYProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, style, ...restScrollbarProps } = scrollbarProps;

          return (
            <div
              {...restScrollbarProps}
              className={styles.trackY}
              ref={elementRef}
              style={{ ...style, paddingRight: `${space}px` }}
            />
          );
        },
      }}
    >
      {children}
    </Scrollbar>
  );
};

export default memo(Scroller);
