import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  className: string;
}

const Badge: FC<BadgeProps> = ({ className, text }) => {
  return (
    <div className={cn(className, styles.badge)}>
      <div className={styles.span} />
      <div className={styles.badgeIn}>{text}</div>
    </div>
  );
};

export default Badge;
