import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import MainInstagramSection from '@Components/MainInstagramSection';
import { MetaData } from '@Types/Meta';
import { ProductData } from '@Types/Product';
import MainGallery from './elems/MainGallery';
import Hits from './elems/Hits';
import Recommendations from './elems/Recommendations';
import NewProducts from './elems/NewProducts';
import Popular from './elems/Popular';
import { PromoCardData } from './elems/PromoCard';
import { sliderData, hits, popular } from './data';
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
        <Popular title='Популярные категории' categories={popular.products} />
      </div>

      {page.novelties?.items.length > 0 && (
        <div className={styles.section}>
          <NewProducts title='Новинки' products={page.novelties.items} />
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.section}>
          <SectionShowroomsMap
            className={styles.map}
            datasForMap={page.map}
            pickupPoints={page.sellPoints}
          />
        </div>
      </div>

      <div className={styles.section}>
        <MainInstagramSection className={styles.instagram} posts={page.instagram.items} />
      </div>
    </div>
  );
};

export default memo(PageIndex);
