import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Badge.module.css';

export interface BadgeProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  badge: 'sale';
}

const Badge: FC<BadgeProp> = ({ className, badge }) => {
  return (
    <div
      className={cn(
        styles.badge,
        {
          [styles.sale]: badge === 'sale',
        },
        className,
      )}
    />
  );
};

export default memo(Badge);
