import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import PromoCard, { PromoCardProps } from '@Components/PromoCard';
import NavArrows from '@UI/NavArrows/NavArrows';

import styles from './Recommendations.module.css';

export interface RecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cards: PromoCardProps[];
}

const Recommendations: FC<RecommendationsProps> = ({ className, cards }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > cards.length) return cards.length;

      return value;
    },
    [cards.length],
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
        className={cn(styles.sectionWrapper, 'test')}
        title='Рекомендуем сегодня'
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
            {cards.map((card, index) => {
              return (
                <div key={index} className={cn(styles.slide, 'test-slide')}>
                  <PromoCard {...card} />
                </div>
              );
            })}
          </Gallery>
          {track && track.width < 100 && <ProgressBar className={styles.track} track={track} />}
        </div>
      </Section>
    </div>
  );
};

export default memo(Recommendations);