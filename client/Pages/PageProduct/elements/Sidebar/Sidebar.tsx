import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import declOfNum from '@divanru/ts-utils/declOfNum';

import Like from '@Components/Like';
import OrderBonuses from '@Components/OrderBonuses';
import Fabrics from '@Components/Fabrics';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import Rating from '@UI/Rating';
import useMeta from '@Queries/useMeta';
import fabricImages from '../../fabrics';
import LinksList from '../LinksList';
import styles from './Sidebar.module.css';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
}

const fabrics = [
  {
    image: fabricImages[0],
  },
  {
    image: fabricImages[1],
  },
  {
    image: fabricImages[2],
  },
];

const Sidebar: FC<SidebarProps> = (props) => {
  const { className, page, ...restProps } = props;
  const meta = useMeta({ ssr: true });

  if (!meta.isSuccess) return null;

  const { product } = page;
  const shortName = product.name.split(' ')[0];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  const labels = ['отзыв', 'отзыва', 'отзывов'];
  const label = declOfNum(page.reviewsPhotoCount, labels);
  const countReviewsText = `${page.reviewsPhotoCount} ${label}`;

  return (
    <div {...restProps} className={cn(styles.sidebar, className)}>
      <div className={styles.shortName}>
        {shortName}
        <Like className={styles.like} />
      </div>
      <div className={styles.fullName}>{product.name}</div>

      {page.reviewsPhotoCount > 0 && (
        <div className={styles.wrapperRating}>
          <Rating className={styles.rating} defaultValue={product.rating} />
          <Button className={styles.countReviews} theme='linkSecondary'>
            {countReviewsText}
          </Button>
        </div>
      )}

      <div className={styles.wrapperPrice}>
        <div className={styles.labelPrice}>Цена</div>
        <div className={styles.containerPrices}>
          <Price className={styles.actualPrice} price={product.price.actual} />
          {hasExpired && (
            <Price expired className={styles.expiredPrice} price={product.price.expired} />
          )}
          {hasDiscount && <Discount className={styles.discount}>{product.price.discount}</Discount>}
        </div>
      </div>

      <OrderBonuses className={styles.bonuses} productIds={[product.id]} />

      {meta.data.country === 'RUS' && (
        <Button className={styles.priceReduction} theme='linkSecondary'>
          Подписаться на изменение цены
        </Button>
      )}

      <div className={styles.wrapperFabrics}>
        <Fabrics fabrics={fabrics} defaultSelectedFabric={fabrics[0]} size='m' />
        <Button className={styles.orderFabrics} theme='linkSecondary'>
          Заказать образцы тканей
        </Button>
      </div>

      <div className={styles.actions}>
        <Button className={styles.action} wide theme='secondary'>
          Изменить конфигурацию
        </Button>
        <Button className={styles.action} wide>
          В корзину
        </Button>
      </div>

      <div className={styles.linksList}>
        <LinksList
          items={[
            {
              icon: <div className={cn(styles.icon, styles.perzent)} />,
              label: 'Купить в кредит без переплаты',
            },
            {
              icon: <div className={cn(styles.icon, styles.attention)} />,
              label: 'Гарантируем качество',
            },
            {
              label: 'Эта модель в шоурумах',
            },
            {
              label: 'Характеристики',
            },
            {
              label: 'Сопутствующие товары',
            },
            {
              label: 'Фото и отзывы',
            },
            {
              label: 'Способы оплаты',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default memo(Sidebar);
