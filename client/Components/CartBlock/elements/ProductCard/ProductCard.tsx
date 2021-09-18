import { HTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import { CartProductData } from '@Types/Cart';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: CartProductData;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const hasExpired = product.oldprice > 0 && product.oldprice !== product.price;
  const discount = hasExpired ? Math.ceil(100 - (product.price / product.oldprice) * 100) : 0;

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      {/* TODO: добавить orientation для картинок у товара в корзине */}
      <GalleryProductPreviews
        className={styles.preview}
        images={[{ src: product.image, orientation: 'landscape' }]}
        link={product.link}
      />
      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>
            <Price className={styles.actualPrice} price={product.price} />
            {hasExpired && (
              <Price expired className={styles.expiredPrice} price={product.oldprice} />
            )}
            {discount > 0 && <Discount className={styles.discount}>{discount}</Discount>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
