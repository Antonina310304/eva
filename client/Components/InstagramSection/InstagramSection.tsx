import React, { FC, HTMLAttributes, ReactChild, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import InstagramGallery from '@Components/InstagramGallery';
import { ProgressOptions } from '@UI/Gallery';
import { InstagramPostData } from '@Types/InstagramPost';
import styles from './InstagramSection.module.css';

export interface InstagramSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  description?: ReactChild | ReactChild[];
  posts: InstagramPostData[];
}

const InstragramSection: FC<InstagramSectionProps> = (props) => {
  const { className, title, description, posts, ...restProps } = props;
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
      hasArrows={track && track.width < 100}
      onPrev={handlePrev}
      onNext={handleNext}
    >
      <div className={styles.wrapperGallery}>
        <InstagramGallery
          className={styles.gallery}
          cnViewport={styles.galleryViewport}
          slideIndex={slideIndex}
          posts={posts}
          onChangeProgress={handleChangeProgress}
          onChangeCurrent={handleChangeCurrent}
        />
      </div>
    </Section>
  );
};

export default memo(InstragramSection);
