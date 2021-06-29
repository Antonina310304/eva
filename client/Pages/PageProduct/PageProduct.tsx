import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import Like from '@Components/Like';
import OrderBonuses from '@Components/OrderBonuses';
import Fabrics from '@Components/Fabrics';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import useProduct from '@Queries/useProduct';
import MainImageGrid from './elements/MainImageGrid';
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
  const { slug } = useParams<RouteParams>();
  const { data, isSuccess } = useProduct({ slug, ssr: true });

  if (!isSuccess) return null;

  const { product } = data;
  const shortName = product.name.split(' ')[0];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.wrapperMain}>
        <div className={styles.mainContent}>
          <MainImageGrid images={data.mediaGallery} />
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
        </div>
      </div>
    </div>
  );
};

export default memo(PageProduct);
