import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import CrossSaleProductCard from '@Components/CrossSaleProductCard/CrossSaleProductCard';

import CrossSaleSection from '@Components/CrossSaleSection';

import Container from '@Components/Container';
import { InstagramPostData } from '@Types/InstagramPost';
import styles from './Hits.module.css';

export interface HitsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: { title: string; description: string; products: InstagramPostData[] };
}

const Hits: FC<HitsProps> = ({ data, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <Container>
        <div className={styles.header}>
          <p className={styles.title}>{data.title}</p>
          <p className={styles.description}>{data.description}</p>
        </div>
      </Container>
      <div>
        <div className={styles.wrapperGallery}>
          <CrossSaleSection
            className={styles.sectionCrossSale}
            title=''
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

export default memo(Hits);
