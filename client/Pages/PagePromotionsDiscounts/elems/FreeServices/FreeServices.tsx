import { FC, memo, HTMLAttributes, useState, useCallback } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import Section from '@Components/Section';
import PromoCard, { PromoCardData } from '@Components/PromoCard';
import NavArrows from '@UI/NavArrows';
import styles from './FreeServices.module.css';

export interface FreeServicesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  cards: PromoCardData[];
}

const FreeServices: FC<FreeServicesProps> = (props) => {
  const { className, title, cards, ...restProps } = props;
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
    <div {...restProps} className={cn(className, styles.wrapper)}>
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
            {cards.map((card, index) => (
              <div key={index} className={styles.slide}>
                <PromoCard card={card} />
              </div>
            ))}
          </Gallery>

          {track?.width < 100 && <ProgressBar className={styles.track} track={track} />}
        </div>
      </Section>
    </div>
  );
};

export default memo(FreeServices);
