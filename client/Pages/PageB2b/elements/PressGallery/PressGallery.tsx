import React, { useState, useCallback, FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import ProgressBar from '@UI/ProgressBar';
import Image from '@UI/Image';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import { ArticleItem } from '@Pages/PageB2b/typings';
import styles from './PressGallery.module.css';

export interface SocialItem {
  id: number;
  link: string;
}
export interface PressGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  articles: ArticleItem[];
  socials: SocialItem[];
}

const PressGallery: FC<PressGalleryProps> = (props) => {
  const { className, articles, socials, ...restProps } = props;
  const { isMobileM } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [, { openModal }] = useModals();

  const handleClickArticle = useCallback(
    (_e, index) => {
      // Нужно чтобы модалка не открывалась во время спайпа
      if (window.cancelClick) return;

      openModal('Article', { articles, index, socials });
    },
    [openModal, articles, socials],
  );

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
        !isMobileM && (
          <NavArrows
            className={cn(styles.arrows, { [styles.visible]: track?.width < 100 })}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )
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
            <div
              className={styles.article}
              key={index}
              onClick={(e) => handleClickArticle(e, index)}
            >
              <div className={styles.articleItem}>
                <div className={styles.imageWrapper}>
                  <Image className={styles.articleImage} src={item.src} />
                  <img className={styles.logo} src={item.logo} />
                </div>
                <div className={styles.subheading}>{item.preview}</div>
              </div>
            </div>
          ))}
        </Gallery>

        <ProgressBar className={styles.track} track={track} />
      </div>
    </Section>
  );
};

export default memo(PressGallery);
