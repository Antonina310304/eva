import React, { FC, HTMLAttributes, memo, ReactElement } from 'react';
import cn from 'classnames';

import styles from './MainGrid.module.css';

export interface MainGridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sidebar?: ReactElement | ReactElement[];
}

const MainGrid: FC<MainGridProps> = (props) => {
  const { className, sidebar, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.grid, className)}>
      <div className={styles.main}>{children}</div>
      <div className={styles.sidebar}>{sidebar}</div>
    </div>
  );
};

export default memo(MainGrid);
