import React, { FC, memo, HTMLAttributes, useState, useCallback } from 'react';

import Section from '@Components/Section';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import NavArrows from '@UI/NavArrows/NavArrows';
import Link from '@UI/Link/Link';
import Button from '@UI/Button';
import ProductCardPartial from '@Components/ProductCardPartial';
import { ProductData } from '@Types/Product';

import styles from './Top10.module.css';

export interface Top10Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  products: ProductData[];
}

const Top10: FC<Top10Props> = ({ className, products }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > products.length) return products.length;

      return value;
    },
    [products.length],
  );

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlideIndex(current);
  }, []);

  const handlePrev = useCallback(() => {
    setSlideIndex((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track && track.finished) return;

    setSlideIndex((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <Section
        className={styles.sectionWrapper}
        title='Топ 10 из Divan.Trends'
        additional={
          track?.width < 100 && (
            <div className={styles.navArrows}>
              <NavArrows onPrev={handlePrev} onNext={handleNext} />
            </div>
          )
        }
        additionalBreakup
      >
        <div className={styles.galleryContainer}>
          <Gallery
            className={styles.gallery}
            slideIndex={slideIndex}
            onChangeProgress={handleChangeProgress}
            onChangeCurrent={handleChangeCurrent}
          >
            {products.map((product) => {
              return (
                <div key={product.id} className={styles.slide}>
                  <ProductCardPartial product={product} />
                </div>
              );
            })}
          </Gallery>
          {track && track.width < 100 && <ProgressBar className={styles.track} track={track} />}
        </div>
        <div className={styles.btnWrapper}>
          <Link className={styles.moreLink} to='/'>
            <Button className={styles.btn} theme='dirty'>
              Смотреть еще
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default memo(Top10);
