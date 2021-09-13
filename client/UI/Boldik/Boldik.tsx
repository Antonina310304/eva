import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Boldik.module.css';

export interface BoldikProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

const Boldik: FC<BoldikProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <span {...restProps} data-text={children} className={cn(styles.boldik, className)}>
      <span className={styles.text}>{children}</span>
    </span>
  );
};

export default memo(Boldik);
