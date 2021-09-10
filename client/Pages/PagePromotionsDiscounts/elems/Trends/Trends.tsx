import React, { cloneElement, HTMLAttributes, useCallback, useState } from 'react';
import CategoryCard from '@Pages/PagePromotionsDiscounts/elems/Trends/CategoryCard/CategoryCard';
import TrendsLogo from '@Pages/PagePromotionsDiscounts/elems/Trends/TrendsLogo';
import CrossSaleSection, {
  CrossSaleSectionProps,
} from '@Pages/PageProduct/elements/CrossSaleSection';
import cn from 'classnames';
import NavArrows from '@UI/NavArrows/NavArrows';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar/ProgressBar';
import Section from '@Components/Section';
import { nanoid } from 'nanoid';
import { ProductData } from '@Types/Product';
import mockProductsData from '@Pages/PagePromotionsDiscounts/elems/Trends/Mock/mockProductData';
import { MockCategoryInterface } from './mock/mockCategories';
import styles from './Trends.module.css';

export interface InTrendProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  categories: MockCategoryInterface[];
}

const Trends: React.FC<InTrendProps> = ({ categories, className }) => {
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slide, setSlide] = useState(0);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > categories.length - 1) return categories.length - 1;

      return value;
    },
    [categories.length],
  );

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track.finished) return;

    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  return (
    <>
      <TrendsLogo className={styles.trendsLogo} />

      {/* <CrossSaleSection
        className={styles.trendsLogo}
        title='title'
        products={mockProductsData}
        renderItem={(props) => (
          <div>
            <img src={props.product.images[0].src} />
            <div>{props.product.name}</div>
          </div>
        )}
      /> */}

      <Section
        className={cn(styles.section, className)}
        title='Будь в тренде: яркий интерьер в деталях'
        additional={
          <NavArrows
            className={cn(styles.arrows, { [styles.visible]: track?.width < 100 })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        }
      >
        <div className={styles.wrapperGallery}>
          <Gallery
            className={styles.gallery}
            slideIndex={slide}
            key={categories.length}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {categories.map((category, index) => (
              <div>
                <CategoryCard
                  key={index}
                  imageUrl={category.imageUrl}
                  title={category.title}
                  description={category.description}
                />
              </div>
            ))}
          </Gallery>
          <ProgressBar track={track} />
        </div>
      </Section>

      {/* <div className={styles.wrapper}>
        <h2>Будь в тренде: яркий интерьер в деталях</h2>
        <div className={styles.categoriesWrapper}>
          {categories.map((category) => (
            <CategoryCard
              imageUrl={category.imageUrl}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div> */}
    </>
  );
};

export default React.memo(Trends);
