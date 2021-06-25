import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  currentItem: number;
  totalItems: number;
}

const ProgressBar: FC<ProgressBarProps> = (props) => {
  const { className, currentItem, totalItems, ...restProps } = props;

  const dieWidth = Number((100 / totalItems).toFixed(3));
  const dieStyles = {
    width: `${dieWidth}%`,
    left: `${dieWidth * currentItem}%`,
  };

  return (
    <div {...restProps} className={cn(styles.progress, className)}>
      <div className={styles.die} style={dieStyles} />
    </div>
  );
};

export default memo(ProgressBar);
