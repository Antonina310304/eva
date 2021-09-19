import React, { FC, HTMLAttributes, useCallback, useState, memo } from 'react';
import cn from 'classnames';
import NavArrows from '@UI/NavArrows/NavArrows';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar/ProgressBar';
import Section from '@Components/Section';
import { TrendsCategoryData } from '@Pages/PagePromotionsDiscounts/typings';
import CategoryCard from '../CategoryCard';
import styles from './Trends.module.css';

export interface TrendsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  categories: TrendsCategoryData[];
}

const Trends: FC<TrendsProps> = (props) => {
  const { className, title, categories } = props;
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
          title={title}
          additional={
            track?.width < 100 && (
              <div className={styles.navArrows}>
                <NavArrows onPrev={handlePrev} onNext={handleNext} />
              </div>
            )
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
                <div key={index} className={cn(styles.slide)}>
                  <CategoryCard category={category} />
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

export default memo(Trends);
