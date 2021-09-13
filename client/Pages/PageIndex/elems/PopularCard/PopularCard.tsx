import React, { HTMLAttributes } from 'react';
import Badge from '@UI/Badge';
import Link from '@UI/Link';
import declOfNum from '@Utils/declOfNum';
import { PopularCategoryData } from '@Types/PopularCategory';
import styles from './PopularCard.module.css';

export interface PopularCardProps extends HTMLAttributes<HTMLDivElement> {
  data: PopularCategoryData;
}
const PopularCard = ({ data }) => {
  const declCount = ['модель', 'модели', 'моделей'];

  return (
    <Link to={data.link} className={styles.wrapper}>
      <p className={styles.imgWrapper}>
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
