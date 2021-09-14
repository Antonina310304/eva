import React, { HTMLAttributes, useCallback, useState } from 'react';
import cn from 'classnames';
import NavArrows from '@UI/NavArrows/NavArrows';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar/ProgressBar';
import Section from '@Components/Section';
import CategoryCard from './CategoryCard';
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
      if (value > categories.length) return categories.length;

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
    if (track && track.finished) return;

    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  return (
    <>
      <div className={styles.logoSectionWrapper}>
        <div className={styles.logoSection} />
      </div>

      <div className={styles.wrapper}>
        <Section
          className={cn(styles.section, className)}
          title='Будь в тренде: яркий интерьер в деталях'
          additional={
            track?.width < 100 && (
              <div className={styles.navArrows}>
                <NavArrows onPrev={handlePrev} onNext={handleNext} />
              </div>
            )
          }
          additionalBreakup
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
                <div key={index} className={cn(styles.slide)}>
                  <CategoryCard
                    imageUrl={category.imageUrl}
                    title={category.title}
                    description={category.description}
                  />
                </div>
              ))}
            </Gallery>
            {track?.width < 100 && <ProgressBar track={track} className={styles.progressBar} />}
          </div>
        </Section>
      </div>
    </>
  );
};

export default React.memo(Trends);
