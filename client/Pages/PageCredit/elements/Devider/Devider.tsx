import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Devider.module.css';

export interface DeviderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Devider: FC<DeviderProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.devider, className)}>
      <div className={styles.line} />
    </div>
  );
};

export default memo(Devider);
