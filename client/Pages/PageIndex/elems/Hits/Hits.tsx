import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import CrossSaleSection from '@Components/CrossSaleSection';
import { ProductData } from '@Types/Product';
import styles from './Hits.module.css';

export interface HitsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  products: ProductData[];
}

const Hits: FC<HitsProps> = (props) => {
  const { className, title, products, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(className, styles.wrapper)}>
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <p className={styles.title}>{title}</p>}
          {children && <p className={styles.description}>{children}</p>}
        </div>
      </div>

      <CrossSaleSection
        className={styles.sectionCrossSale}
        products={products}
        renderItem={(productCardProps) => (
          <div className={styles.productItem}>
            <CrossSaleProductCard {...productCardProps} />
          </div>
        )}
      />
    </div>
  );
};

export default memo(Hits);
