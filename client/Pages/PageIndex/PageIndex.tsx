import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import InstagramSection from '@Components/InstagramSection';
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
        <InstagramSection
          className={styles.instagram}
          hasPromoPlaceholder
          title='Ищите вдохновение в инстаграм @official_divan.ru'
          description={
            <div className={styles.instagramDescription}>
              {`Cтилизуете интерьер вместе с Divan.ru – отмечайте `}
              <Link
                view='native'
                target='_blank'
                to='https://www.instagram.com/official_divan.ru/?hl=ru'
              >
                @official_divan.ru
              </Link>
              {` на фото в своем аккаунте Instagram,
                добавляйте хештег #купилвдиванру. Мы публикуем лучшие кадры.`}
            </div>
          }
          posts={page.instagram.items}
        />
      </div>
    </div>
  );
};

export default memo(PageIndex);
