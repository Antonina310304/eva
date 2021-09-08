import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './Recommendations.module.css';

export interface RecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const Recommendations: FC<RecommendationsProps> = ({ title, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Рекомендуем сегодня'}</p>
      <p>слайдер</p>
    </div>
  );
};

export default memo(Recommendations);
