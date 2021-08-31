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

export interface ArticleImage {
  src: string;
}
export interface ArticleData {
  link: string;
  logo: string;
  images: ArticleImage[];
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

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > images.length) return images.length;

      return value;
    },
    [images.length],
  );

  const [slideIndex, setSlideIndex] = useState(1);

  const moveSlide = (index) => {
    setSlideIndex(index);
  };

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
    <div {...restProps} className={cn(styles.pressDetails, [className])}>
      <div className={styles.carousel}>
        <div className={styles.wrapperMainGallery}>
          <Gallery
            slideIndex={slide}
            onChangeCurrent={handleChangeCurrent}
            onChangeProgress={handleChangeProgress}
          >
            {images.map((image, index) => (
              <div className={styles.mainGalleryItem}>
                <Image src={image.src} key={index} className={styles.mainGalleryPreview} />
              </div>
            ))}
          </Gallery>
        </div>
        {isMobileM ? (
          <ProgressBar className={styles.progressBar} track={track} />
        ) : (
          <div className={styles.wrapperSecondGallery}>
            <Gallery
              className={styles.secondGallery}
              slideIndex={slide}
              key={images.length}
              onChangeCurrent={handleChangeCurrent}
              onChangeProgress={handleChangeProgress}
            >
              {images.map((image, index) => (
                <div className={styles.secondGalleryItem} key={index}>
                  <Image className={styles.secondGalleryPreview} src={image.src} />
                </div>
              ))}
            </Gallery>
            <ProgressBar className={styles.progressBar} track={track} />
          </div>
        )}
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
