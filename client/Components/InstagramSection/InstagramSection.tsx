import React, { FC, HTMLAttributes, ReactChild, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import InstagramGallery from '@Components/InstagramGallery';
import { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import { InstagramPostData } from '@Types/InstagramPost';
import styles from './InstagramSection.module.css';

export interface InstagramSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: ReactChild | ReactChild[];
  posts: InstagramPostData[];
  hasPromoPlaceholder?: boolean;
}

const InstragramSection: FC<InstagramSectionProps> = (props) => {
  const { className, title, description, posts, hasPromoPlaceholder, ...restProps } = props;
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > posts.length) return posts.length;

      return value;
    },
    [posts.length],
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
    <Section
      {...restProps}
      className={cn(styles.section, className)}
      title={title}
      description={description}
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
        <InstagramGallery
          className={styles.gallery}
          slideIndex={slideIndex}
          posts={posts}
          hasPromoPlaceholder={hasPromoPlaceholder}
          onChangeProgress={handleChangeProgress}
          onChangeCurrent={handleChangeCurrent}
        />
      </div>
    </Section>
  );
};

export default memo(InstragramSection);
