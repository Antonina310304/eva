import React, { FC, memo, HTMLAttributes, useState, useCallback } from 'react';
import cn from 'classnames';

import Gallery, { GalleryProps, ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import NavArrows from '@UI/NavArrows';
import PromoCard, { PromoCardData } from '@Components/PromoCard';
import Section from '@Components/Section';
import useMedias from '@Hooks/useMedias';
import styles from './CurrentPromotions.module.css';

export interface CurrentPromotionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cards: PromoCardData[];
}

const Container: FC<GalleryProps> = (props) => {
  const { children, ...restProps } = props;
  const { isDesktop } = useMedias();

  return (
    <div className={styles.galleryContainer}>
      {isDesktop ? (
        <Gallery {...restProps} className={styles.gallery}>
          {children}
        </Gallery>
      ) : (
        <div className={styles.list}>{children}</div>
      )}
    </div>
  );
};

const CurrentPromotions: FC<CurrentPromotionsProps> = (props) => {
  const { className, title, cards, ...restProps } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const { isDesktop } = useMedias();
  const needNav = isDesktop && track?.width < 100;

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
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <Section
        className={styles.sectionWrapper}
        title={title}
        additional={
          needNav && (
            <div className={styles.navArrows}>
              <NavArrows onPrev={handlePrev} onNext={handleNext} />
            </div>
          )
        }
      >
        <Container
          slideIndex={slideIndex}
          onChangeProgress={handleChangeProgress}
          onChangeCurrent={handleChangeCurrent}
        >
          {cards.map((card, index) => (
            <div key={index} className={styles.item}>
              <PromoCard card={card} />
            </div>
          ))}

          {needNav && <ProgressBar className={styles.track} track={track} />}
        </Container>
      </Section>
    </div>
  );
};

export default memo(CurrentPromotions);
