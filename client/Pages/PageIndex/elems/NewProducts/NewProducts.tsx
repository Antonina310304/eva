import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import CrossSaleSection from '@Components/CrossSaleSection/CrossSaleSection';
import CrossSaleProductCard from '@Components/CrossSaleProductCard/CrossSaleProductCard';
import { ProductData } from '@Types/Product';
import styles from './NewProducts.module.css';

export interface NewProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
}

const NewProducts: FC<NewProductsProps> = (props) => {
  const { className, title, products, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <div className={styles.wrapperGallery}>
        <CrossSaleSection
          className={styles.sectionCrossSale}
          title={title}
          products={products}
          renderItem={(productCardProps) => (
            <div className={styles.productItem}>
              <CrossSaleProductCard {...productCardProps} />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default memo(NewProducts);
