import React, { FC, memo } from 'react';

import GalleryWithPagination from '@Components/GalleryWithPagination';
import NavSideArrows from '@UI/NavSideArrows';

import useMedias from '@Hooks/useMedias';
import Offer from '@Pages/PageSleeper/elems/SleeperGallery/elems/ Offer';
import { SleeperProductsData } from '@Types/SleeperGallery';
import styles from './SleeperGallery.module.css';

export interface SleeperGalleryProps {
  className?: string;
  slider: string[];
  products: SleeperProductsData[];
}

const SleeperGallery: FC<SleeperGalleryProps> = ({ slider, products }) => {
  const { isMobileM } = useMedias();
  return (
    <div className={styles.wrapper}>
      <div className={styles.sliderWrapper}>
        <GalleryWithPagination
          className={styles.inner}
          renderButtons={({ onPrev, onNext }) => {
            return (
              !isMobileM && (
                <div className={styles.arrowWrapper}>
                  <NavSideArrows onPrev={onPrev} onNext={onNext} />
                </div>
              )
            );
          }}
          footerBlock={
            <div className={styles.offer}>
              <Offer products={products} />
            </div>
          }
        >
          {slider.map((item) => (
            <div className={styles.sliderItem}>
              <div className={styles.sliderInner} style={{ backgroundImage: `url(${item})` }} />
            </div>
          ))}
        </GalleryWithPagination>
      </div>
    </div>
  );
};

export default memo(SleeperGallery);
