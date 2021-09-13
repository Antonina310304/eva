import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import SectionTitle from '@Components/SectionTitle/SectionTitle';
import Container from '@Components/Container';
import { InstagramPostData } from '@Types/InstagramPost';
import CrossSaleSection from '@Components/CrossSaleSection/CrossSaleSection';
import CrossSaleProductCard from '@Components/CrossSaleProductCard/CrossSaleProductCard';
import styles from './NewProducts.module.css';

export interface NewProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: { title: string; products: InstagramPostData[] };
}

const NewProducts: FC<NewProductsProps> = ({ data, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div>
        <div className={styles.wrapperGallery}>
          <CrossSaleSection
            className={styles.sectionCrossSale}
            title={data.title}
            products={data.products}
            renderItem={(productCardProps) => (
              <div className={styles.productItem}>
                <CrossSaleProductCard {...productCardProps} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(NewProducts);
