import React, { useState, useCallback, FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import ProgressBar from '@UI/ProgressBar';
import Image from '@UI/Image';
import { ArticleItem } from '@Pages/PageB2b/typings';
import Link from '@UI/Link';
import styles from './Press.module.css';

export interface PressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  articles: ArticleItem;
}

const Press: FC<PressProps> = (props) => {
  const { className, articles, ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > articles.length) return articles.length;

      return value;
    },
    [articles.length],
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
    <Section
      {...restProps}
      className={cn(styles.section, className)}
      title='Мы в прессе:'
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
          key={articles.length}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {articles.map((item, index) => (
            <div key={index}>
              <div className={styles.articleItem}>
                <Image className={styles.articleImage} src={item.src} />
                <img className={styles.logo} src={item.logo} />
                <Link className={styles.link} to={item.href} view='secondary' target='_blank'>
                  {item.preview}
                </Link>
              </div>
            </div>
          ))}
        </Gallery>

        <ProgressBar className={styles.track} track={track} />
      </div>
    </Section>
  );
};

export default memo(Press);
