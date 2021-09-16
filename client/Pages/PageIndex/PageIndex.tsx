import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import MainInstagramSection from '@Components/MainInstagramSection';
import { MetaData } from '@Types/Meta';
import { ProductData } from '@Types/Product';
import MainGallery from './elems/MainGallery';
import Hits from './elems/Hits';
import Recommendations from './elems/Recommendations';
import { PromoCardData } from './elems/PromoCard';
import { sliderData, hits } from './data';
import mockPromoCardData from './mockPromoCardData';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: Write the types for this
  page: any;
  meta: MetaData;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.section}>
        <MainGallery slides={sliderData} />
      </div>

      <div className={styles.section}>
        <Hits title={hits.title} products={(hits.products as unknown) as ProductData[]}>
          {hits.description}
        </Hits>
      </div>

      <div className={styles.section}>
        <Recommendations cards={mockPromoCardData as PromoCardData[]} />
      </div>

      <div className={styles.section}>
        <MainInstagramSection className={styles.instagram} posts={page.instagram.items} />
      </div>
    </div>
  );
};

export default memo(PageIndex);
