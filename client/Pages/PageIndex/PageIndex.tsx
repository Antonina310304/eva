import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import MainSlider from '@Pages/PageIndex/elems/MainSlider';
import Hits from '@Pages/PageIndex/elems/Hits';
import Recommendations from '@Pages/PageIndex/elems/Recommendations';
import Popular from '@Pages/PageIndex/elems/Popular';
import Ideas from '@Pages/PageIndex/elems/Ideas';
import SectionShowroomsMap from '@Components/SectionShowroomsMap/SectionShowroomsMap';
import {
  pickupPoints,
  maps,
  posts,
  hits,
  newProducts,
  popular,
  sliderData,
} from '@Pages/PageIndex/data';

import NewProducts from '@Pages/PageIndex/elems/NewProducts';

import Container from '@Components/Container';
import InstagramSection from '@Components/InstagramSection/InstagramSection';
import Link from '@UI/Link/Link';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <>
        <div className={styles.section}>
          <MainSlider sliderData={sliderData} />
        </div>
        <div className={styles.section}>
          <Hits data={hits} />
        </div>
        <Recommendations />
        <div className={styles.section}>
          <Popular data={popular} />
        </div>
        <div className={styles.section}>
          <Ideas />
        </div>
        <div className={styles.section}>
          <NewProducts data={newProducts} />
        </div>
        <Container>
          <div className={styles.section}>
            <SectionShowroomsMap
              className={styles.map}
              datasForMap={maps}
              pickupPoints={pickupPoints}
            />
          </div>
        </Container>
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
            posts={posts}
          />
        </div>
      </>
    </div>
  );
};

export default memo(PageIndex);
