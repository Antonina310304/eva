import { FC } from 'react';
import cn from 'classnames';

import Link, { LinkProps } from '@UI/Link';
import declOfNum from '@Utils/declOfNum';
import { PopularCategoryData } from '@Types/PopularCategory';
import styles from './PopularCard.module.css';

export interface PopularCardProps extends Omit<LinkProps, 'to'> {
  className?: string;
  category: PopularCategoryData;
  cardFit?: 'mobile' | 'long' | 'short';
}

const PopularCard: FC<PopularCardProps> = (props) => {
  const { className, category, cardFit = 'mobile', ...restProps } = props;
  const models = ['модель', 'модели', 'моделей'];
  const model = declOfNum(category.count, models);

  return (
    <Link {...restProps} to={category.link} className={cn(styles.wrapper, className)}>
      <p
        className={cn(styles.imgWrapper, {
          [styles.mobile]: cardFit === 'mobile',
          [styles.long]: cardFit === 'long',
          [styles.short]: cardFit === 'short',
        })}
      >
        <img src={category.img} alt={category.title} />
      </p>
      <div className={styles.titleWrap}>
        <span className={styles.title}>{category.title}</span>
        <span className={styles.count}>{`${category.count} ${model}`}</span>
      </div>
      {/* TODO: Написать замену для toLocaleString и указать правильный символ валюты для России/Белоруссии */}
      <div className={styles.discount}>{`от ${category.price.toLocaleString()} ₽`}</div>
    </Link>
  );
};

export default PopularCard;
