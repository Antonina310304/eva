import { FC, memo, HTMLAttributes, useState, useCallback } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import NavArrows from '@UI/NavArrows';
import Button from '@UI/Button';
import Link from '@UI/Link';
import Section from '@Components/Section';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import { ProductData } from '@Types/Product';
import styles from './TopProducts.module.css';

export interface TopProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
}

const TopProducts: FC<TopProductsProps> = (props) => {
  const { className, title, products } = props;
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
        title={title}
        additional={
          track?.width < 100 && (
            <div className={styles.navArrows}>
              <NavArrows onPrev={handlePrev} onNext={handleNext} />
            </div>
          )
        }
      >
        <div className={styles.galleryContainer}>
          <Gallery
            className={styles.gallery}
            slideIndex={slideIndex}
            onChangeProgress={handleChangeProgress}
            onChangeCurrent={handleChangeCurrent}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.galleryItem}>
                <CrossSaleProductCard product={product} />
              </div>
            ))}
          </Gallery>
          {track?.width < 100 && <ProgressBar className={styles.track} track={track} />}
        </div>

        <div className={styles.btnWrapper}>
          <Link to='/category/promo-bud-v-trende'>
            <Button className={styles.btn} theme='dirty'>
              Смотреть еще
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default memo(TopProducts);
