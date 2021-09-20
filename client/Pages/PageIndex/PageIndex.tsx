import { FC, HTMLAttributes, memo } from 'react';
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
import Ideas from './elems/Ideas';
import { PromoCardData } from './elems/PromoCard';
import { sliderData, hits, popular, ideasData } from './data';
import mockPromoCardData from './mockPromoCardData';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: Write the types for this
  page: any;
  meta: MetaData;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, page, ...restProps } = props;

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

      <div className={styles.section}>
        <Ideas title='Идеи для дома' ideas={ideasData.images as any[]} />
      </div>

      {page.novelties?.items.length > 0 && (
        <div className={styles.section}>
          <NewProducts title='Новинки' products={page.novelties.items} />
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.section}>
          <SectionShowroomsMap className={styles.map} map={page.map} />
        </div>
      </div>

      <div className={styles.section}>
        <MainInstagramSection className={styles.instagram} posts={page.instagram.items} />
      </div>
    </div>
  );
};

export default memo(PageIndex);
