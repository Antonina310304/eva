import React, { HTMLAttributes, FC, memo, useCallback } from 'react';
import cn from 'classnames';

import ProductTags from '@Components/ProductTags';
import Like from '@Components/Like';
import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleProductCard.module.css';

export interface CrossSaleProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const CrossSaleProductCard: FC<CrossSaleProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const [, { openModal }] = useModals();
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  const handleClickLike = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <div className={styles.img}>
        <GalleryProductPreviews link={product.link} images={product.images} />
        <div className={styles.actions}>
          <Like onClick={handleClickLike} />
        </div>
        {product.tags?.length > 0 && <ProductTags className={styles.tags} tags={product.tags} />}
      </div>
      <div className={styles.info}>
        <Link className={styles.name} to={product.link}>
          {product.name}
        </Link>
        <div className={styles.price}>
          <Price className={styles.actualPrice} price={product.price.actual} />
          {hasExpired && (
            <Price expired className={styles.expiredPrice} price={product.price.expired} />
          )}
          {hasDiscount && <Discount className={styles.discount}>{product.price.discount}</Discount>}
        </div>
      </div>
    </div>
  );
};

export default memo(CrossSaleProductCard);
