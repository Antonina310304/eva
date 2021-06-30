import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import Like from '@Components/Like';
import OrderBonuses from '@Components/OrderBonuses';
import Fabrics from '@Components/Fabrics';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import usePage from '@Queries/usePage';
import useMeta from '@Queries/useMeta';
import MainImageGrid from './elements/MainImageGrid';
import LinksList from './elements/LinksList';
import styles from './PageProduct.module.css';
import fabricImages from './fabrics';

export interface RouteParams {
  slug: string;
}

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
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

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, ...restProps } = props;
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });
  const meta = useMeta({ ssr: true });

  if (!page.isSuccess) return null;

  const { product, mediaGallery } = page.data;
  const shortName = product.name.split(' ')[0];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.wrapperMain}>
        <div className={styles.mainContent}>
          <MainImageGrid images={mediaGallery} />
        </div>

        <div className={styles.sidebar}>
          <Like className={styles.like} />
          <div className={styles.shortName}>{shortName}</div>
          <div className={styles.fullName}>{product.name}</div>

          <div className={styles.wrapperPrice}>
            <div className={styles.labelPrice}>Цена</div>
            <div className={styles.containerPrices}>
              <Price className={styles.actualPrice} price={product.price.actual} />
              {hasExpired && (
                <Price expired className={styles.expiredPrice} price={product.price.expired} />
              )}
              {hasDiscount && (
                <Discount className={styles.discount}>{product.price.discount}</Discount>
              )}
            </div>
          </div>

          <OrderBonuses className={styles.bonuses} productIds={[product.id]} />

          {meta.data.country === 'RUS' && (
            <Button
              className={styles.priceReduction}
              theme='linkSecondary'
              title='Подписаться на изменение цены'
            />
          )}

          <div className={styles.wrapperFabrics}>
            <Fabrics fabrics={fabrics} defaultSelectedFabric={fabrics[0]} size='m' />
            <Button
              className={styles.orderFabrics}
              theme='linkSecondary'
              title='Заказать образцы тканей'
            />
          </div>

          <div className={styles.actions}>
            <Button
              className={styles.action}
              wide
              theme='secondary'
              title='Изменить конфигурацию'
            />
            <Button className={styles.action} wide title='В корзину' />
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
      </div>
    </div>
  );
};

export default memo(PageProduct);
