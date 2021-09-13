import React, { FC, memo, HTMLAttributes, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import PromoCard, { PromoCardProps } from '@Components/PromoCard';
import NavArrows from '@UI/NavArrows/NavArrows';

import useMedias from '@Hooks/useMedias';

import styles from './CurrentPromotions.module.css';

export interface CurrentPromotionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cards: PromoCardProps[];
}

const CurrentPromotions: FC<CurrentPromotionsProps> = ({ className, cards }) => {
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

  const { isDesktop } = useMedias();

  const renderGallery = useCallback(() => {
    if (!cards.length) return null;

    return (
      <div className={styles.galleryContainer}>
        <Gallery
          className={styles.gallery}
          slideIndex={slideIndex}
          onChangeProgress={handleChangeProgress}
          onChangeCurrent={handleChangeCurrent}
        >
          {cards.map((card, index) => {
            return (
              <div key={index} className={styles.slide}>
                <PromoCard {...card} />
              </div>
            );
          })}
        </Gallery>
        {track && track.width < 100 && <ProgressBar className={styles.track} track={track} />}
      </div>
    );
  }, [cards, handleChangeCurrent, handleChangeProgress, slideIndex, track]);

  const renderList = useCallback(() => {
    if (!cards.length) return null;

    return (
      <div className={styles.galleryContainer}>
        <ul className={styles.list}>
          {cards.map((card, index) => {
            return (
              <li key={index} className={styles.item}>
                <PromoCard {...card} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [cards]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <Section
        className={styles.sectionWrapper}
        title='Действующие акции'
        additional={
          track?.width < 100 &&
          isDesktop && (
            <div className={styles.navArrows}>
              <NavArrows onPrev={handlePrev} onNext={handleNext} />
            </div>
          )
        }
        additionalBreakup
      >
        {isDesktop ? renderGallery() : renderList()}
      </Section>
    </div>
  );
};

export default memo(CurrentPromotions);
