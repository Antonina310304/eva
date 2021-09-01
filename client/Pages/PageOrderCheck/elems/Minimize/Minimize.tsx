import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Minimize.module.css';

export interface MinimizeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  collapsed?: boolean;
}

const Minimize: FC<MinimizeProps> = (props) => {
  const { className, collapsed, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.minimize, { [styles.collapsed]: collapsed }, className)}
    >
      <span className={styles.text}>{collapsed ? 'Развернуть' : 'Свернуть'}</span>
      <div className={styles.icon} />
    </div>
  );
};

export default memo(Minimize);
