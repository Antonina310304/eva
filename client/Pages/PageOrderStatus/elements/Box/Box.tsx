import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Box.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  view?: 'check' | 'product';
}

const Box: FC<Props> = (props) => {
  const { className, title, view, children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.box,
        { [styles.check]: view === 'check', [styles.product]: view === 'product' },
        className,
      )}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default memo(Box);
