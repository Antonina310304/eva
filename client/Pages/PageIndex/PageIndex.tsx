import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import { sliderData, hits } from '@Pages/PageIndex/data';
import { ProductData } from '@Types/Product';
import MainGallery from './elems/MainGallery';
import Hits from './elems/Hits';
import Recommendations from './elems/Recommendations';
import mockPromoCardData from './mockPromoCardData';
import styles from './PageIndex.module.css';
import { PromoCardData } from './elems/PromoCard';

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
    </div>
  );
};

export default memo(PageIndex);
