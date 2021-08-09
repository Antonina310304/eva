import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Added.module.css';

export interface AddedProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Added: FC<AddedProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.added, className)}>
      <div className={styles.iconCheck} />
      <span className={styles.text}>Добавлено</span>
    </div>
  );
};

export default memo(Added);
