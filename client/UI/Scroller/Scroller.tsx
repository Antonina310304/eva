import React, { FC, ReactNode, memo } from 'react';
import Scrollbar from 'react-scrollbars-custom';
import cn from 'classnames';

import styles from './Scroller.module.css';

export interface ScrollerProps {
  className?: string;
  invisible?: boolean;
  scrollTop?: number;
  children: ReactNode | ReactNode[];
}

const Scroller: FC<ScrollerProps> = (props) => {
  const { className, children, invisible, ...restProps } = props;

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
              style={{ paddingRight: invisible ? '0px' : '15px' }}
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
