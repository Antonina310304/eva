import React, { memo, FC } from 'react';
import cn from 'classnames';

import Rating, { RatingProps } from '@UI/Rating';
import styles from './RatingItem.module.css';

export interface RatingItemProps extends RatingProps {
  className?: string;
  label: string;
}

const RatingItem: FC<RatingItemProps> = (props) => {
  const { className, label, ...restProps } = props;

  return (
    <div className={cn(styles.ratingItem, className)}>
      <div className={styles.label}>{label}</div>
      <Rating {...restProps} className={styles.rating} size='m' />
    </div>
  );
};

export default memo(RatingItem);
