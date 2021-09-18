import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import NavArrows from '@UI/NavArrows';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import { ProductData } from '@Types/Product';
import RelatedProductCard from '../RelatedProductCard';
import styles from './RelatedProductsSection.module.css';

export interface RelatedProductsSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  relatedProducts: ProductData[];
}

const RelatedProductsSection: FC<RelatedProductsSectionProps> = (props) => {
  const { className, title, relatedProducts, ...restProps } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (slide: number) => {
      if (slide < 0) return 0;
      if (slide >= relatedProducts.length - 1) return relatedProducts.length - 1;

      return slide;
    },
    [relatedProducts.length],
  );

  const handleChangeCurrent = useCallback(({ current }) => {
    setCurrentSlide(current);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track?.finished) return;

    setCurrentSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  return (
    <div {...restProps} className={cn(styles.section, className)}>
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        {track?.width < 100 && (
          <NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
        )}
      </div>

      <div className={styles.wrapperGallery}>
        <Gallery
          className={styles.gallery}
          slideIndex={currentSlide}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {relatedProducts.map((product) => (
            <div className={styles.galleryItem} key={product.id}>
              <RelatedProductCard product={product} />
            </div>
          ))}
        </Gallery>

        <ProgressBar className={styles.progress} track={track} />
      </div>
    </div>
  );
};

export default memo(RelatedProductsSection);
