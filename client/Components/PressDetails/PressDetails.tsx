import React, { FC, useCallback, useState, memo } from 'react';

import cn from 'classnames';
import Image from '@UI/Image';
import ProgressBar from '@UI/ProgressBar';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import Button from '@UI/Button';
import Link from '@UI/Link';

import styles from './PressDetails.module.css';

export interface SocialItem {
  id: number;
  link: string;
}
export interface ArticleData {
  link: string;
  logo: string;
  images: string[];
  title: string;
  text: string;
  preview: string;
}

export interface PressDetailsProps {
  className?: string;
  article: ArticleData;
  socials: SocialItem;
}

const PressDetails: FC<PressDetailsProps> = (props) => {
  const { className, article, socials, ...restProps } = props;
  const { link, logo, images, preview, text } = article;
  const { isMobileM } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  console.log(images);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > images.length) return images.length;

      return value;
    },
    [images.length],
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

  const renderNavigation = useCallback(
    ({ current, total, inViewport, goTo, prev, next }) => {
      if (inViewport) return null;

      return isMobileM ? (
        <div className={styles.progressBar}>
          <ProgressBar className={styles.track} track={track} />
        </div>
      ) : (
        <Gallery
          className={styles.gallery}
          slideIndex={slide}
          key={images.length}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {images.map((item, index) => (
            <div className={styles.imageWrapper} key={index}>
              <Image className={styles.articleImage} src={item.src} />
            </div>
          ))}
        </Gallery>
      );
    },
    [images, isMobileM, handleChangeCurrent, handleChangeProgress, slide, track],
  );

  return (
    <div {...restProps} className={cn(styles.pressDetails, [className])}>
      <div className={styles.carousel}>
        <Gallery className={styles.slider}>
          {images.map((item, index) => (
            <Image src={item.src} key={index} className={styles.sliderItem} />
          ))}
        </Gallery>
        <div className={styles.wrapperGallery}>
          <Gallery
            className={styles.gallery}
            render={renderNavigation}
            slideIndex={slide}
            key={images.length}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {images.map((item, index) => (
              <Image className={styles.navImage} src={item.src} key={index} />
            ))}
          </Gallery>

          <ProgressBar className={styles.track} track={track} />
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.heading}>{preview}</div>
        <div className={styles.text}>{text}</div>
        <Button className={styles.button}>
          <Link className={styles.link} to={link} target='_blank' view='default'>
            Читать статью
          </Link>
        </Button>

        <div className={styles.logoWrapper}>
          <Image className={styles.logo} src={logo} />
        </div>
      </div>
    </div>
  );
};

export default memo(PressDetails);
