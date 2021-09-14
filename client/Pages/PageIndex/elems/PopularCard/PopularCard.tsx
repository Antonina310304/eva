import React, { FC, HTMLAttributes } from 'react';
import Link from '@UI/Link';
import declOfNum from '@Utils/declOfNum';
import { PopularCategoryData } from '@Types/PopularCategory';
import cn from 'classnames';
import styles from './PopularCard.module.css';

export interface PopularCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: PopularCategoryData;
  cardFit?: 'mobile' | 'long' | 'short';
}
const PopularCard: FC<PopularCardProps> = ({ className, data, cardFit = 'mobile' }) => {
  const declCount = ['модель', 'модели', 'моделей'];

  return (
    <Link to={data.link} className={cn(styles.wrapper, className)}>
      <p
        className={cn(styles.imgWrapper, {
          [styles.mobile]: cardFit === 'mobile',
          [styles.long]: cardFit === 'long',
          [styles.short]: cardFit === 'short',
        })}
      >
        <img src={data.img} alt={data.title} />
      </p>
      <div className={styles.titleWrap}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.count}>{`${data.count} ${declOfNum(data.count, declCount)}`}</span>
      </div>
      <div className={styles.discount}>{`от ${data.price.toLocaleString()} ₽`}</div>
    </Link>
  );
};

export default PopularCard;
