import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Remove.module.css';

export interface RemoveProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Remove: FC<RemoveProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.remove, className)}>
      <span className={styles.text}>Удалить</span>
      <div className={styles.icon} />
    </div>
  );
};

export default memo(Remove);
