import React, { FC, HTMLAttributes, memo } from 'react';

import { BadgeData } from '@Types/Badge';
import cn from 'classnames';

import styles from './Badge.module.css';

export interface BadgeProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  badge: BadgeData;
}

const Badge: FC<BadgeProp> = ({ className, badge }) => {
  return (
    <div
      className={cn(className, styles.badge, {
        [styles.sale]: badge === 'sale',
      })}
    />
  );
};

export default memo(Badge);
