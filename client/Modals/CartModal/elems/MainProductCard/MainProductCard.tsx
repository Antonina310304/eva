import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import { CartPositionData, CartProductData } from '@Types/Cart';
import Preview from './elems/Preview';
import Footer from './elems/Footer';
import styles from './MainProductCard.module.css';

export interface MainProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: CartProductData;
  position: CartPositionData;
}

const MainProductCard: FC<MainProductCardProps> = (props) => {
  const { className, product, position, ...restProps } = props;
  const { isMobile } = useMedias();

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <div className={styles.main}>
        <Preview className={styles.preview} product={product} />

        <div className={styles.content}>
          <div className={styles.name}>{`${product.type} ${product.name}`}</div>
          {!isMobile && (
            <div className={styles.wrapperFooter}>
              <Footer product={product} position={position} />
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <div className={styles.wrapperFooter}>
          <Footer product={product} position={position} />
        </div>
      )}
    </div>
  );
};

export default memo(MainProductCard);
