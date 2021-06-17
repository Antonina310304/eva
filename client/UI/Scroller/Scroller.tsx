import React, { FC, ReactChild, memo } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import cn from 'classnames';

import styles from './Scroller.module.css';

export interface ScrollerProps {
  className?: string;
  space?: number;
  invisible?: boolean;
  children: ReactChild | ReactChild[];
}

const Scroller: FC<ScrollerProps> = (props) => {
  const { className, children, space = 0, invisible, ...restProps } = props;

  return (
    <Scrollbar
      {...restProps}
      className={cn(styles.scroller, { [styles.invisible]: invisible }, className)}
      noScrollX
      noDefaultStyles
      wrapperProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, ...restScrollbarProps } = scrollbarProps;

          return <div {...restScrollbarProps} ref={elementRef} className={styles.wrapper} />;
        },
      }}
      scrollerProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, ...restScrollbarProps } = scrollbarProps;

          return (
            <div {...restScrollbarProps} ref={elementRef} className={styles.scrollerContainer} />
          );
        },
      }}
      contentProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, ...restScrollbarProps } = scrollbarProps;

          return (
            <div
              {...restScrollbarProps}
              ref={elementRef}
              className={styles.content}
              style={{ paddingRight: `${space}px` }}
            />
          );
        },
      }}
      trackYProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, ...restScrollbarProps } = scrollbarProps;

          return <div {...restScrollbarProps} className={styles.trackY} ref={elementRef} />;
        },
      }}
      thumbYProps={{
        renderer: (scrollbarProps) => {
          const { elementRef, style, ...restScrollbarProps } = scrollbarProps;

          return (
            <div
              {...restScrollbarProps}
              ref={elementRef}
              className={styles.thumbY}
              style={{ height: style.height, transform: style.transform }}
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
