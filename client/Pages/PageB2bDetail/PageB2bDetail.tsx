import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import { PageB2bDetailData } from './typings';
import styles from './PageB2bDetail.module.css';

export interface PageB2bDetailProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageB2bDetailData;
}

const PageB2bDetail: FC<PageB2bDetailProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { title, teaser, projects, examples } = page;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > examples.length) return examples.length;

      return value;
    },
    [examples.length],
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
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.teaserWrapper}>
        <div className={styles.teaser}>{teaser}</div>
      </div>
      <h2 className={styles.subheading}>{projects.title}</h2>
      <Section
        {...restProps}
        className={cn(styles.section, className)}
        additional={<NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />}
      >
        <div className={styles.wrapperGallery}>
          <Gallery
            className={styles.gallery}
            slideIndex={slide}
            key={examples.length}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {(examples as any[]).map((item, index) => (
              <div className={styles.galleryItem} key={index}>
                <Image className={styles.galleryImage} src={item.src} />
              </div>
            ))}
          </Gallery>

          <ProgressBar className={styles.progressBar} track={track} />
        </div>
      </Section>
    </div>
  );
};

export default memo(PageB2bDetail);
