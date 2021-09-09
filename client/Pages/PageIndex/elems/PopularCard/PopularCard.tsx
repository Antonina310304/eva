import React, { HTMLAttributes } from 'react';
import Badge from '@UI/Badge';
import styles from './PopularCard.module.css';

export interface PopularCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  img: string;
  count: number;
  badge: string;
}
const PopularCard = ({ title, img, count, badge }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.imgWrapper}>
        <img src={img} alt={title} />
      </p>
      <div className={styles.titleWrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle}>{count}</span>
      </div>
      <Badge text={badge} className={styles.badge} />
    </div>
  );
};

export default PopularCard;
