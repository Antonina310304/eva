import React, { FC, useCallback, useState, memo } from 'react';

import cn from 'classnames';
import Image from '@UI/Image';
import Share from '@Components/Share';
import Scroller from '@UI/Scroller';
import ProgressBar from '@UI/ProgressBar';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import Button from '@UI/Button';
import Link from '@UI/Link';
import { MetaDataSocial } from '@Types/Meta';
import styles from './PressDetails.module.css';

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
  socials: MetaDataSocial[];
}

const PressDetails: FC<PressDetailsProps> = (props) => {
  const { className, article, socials, ...restProps } = props;
  const { link, logo, images, preview, text } = article;
  const { isDesktop } = useMedias();
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const handleClickPreview = useCallback((_e, previewIndex) => {
    if (window.cancelClick) return;

    setSlideIndex(previewIndex);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  return (
    <div {...restProps} className={cn(styles.pressDetails, [className])}>
      <div className={styles.carousel}>
        <div className={styles.wrapperMainGallery}>
          <Gallery slideIndex={slideIndex}>
            {images.map((image, indexSlide) => (
              <div className={styles.mainGalleryItem} key={indexSlide}>
                <Image className={styles.mainGalleryPreview} src={image.src} />
              </div>
            ))}
          </Gallery>
        </div>
        {isDesktop ? (
          <Scroller className={styles.scroller}>
            {images.map((image, indexSlide) => (
              <div
                className={styles.secondGalleryItem}
                key={indexSlide}
                onClick={(e) => handleClickPreview(e, indexSlide)}
              >
                <Image className={styles.secondGalleryPreview} src={image.src} />
              </div>
            ))}
          </Scroller>
        ) : (
          <div className={styles.wrapperSecondGallery}>
            <Gallery
              className={styles.secondGallery}
              key={images.length}
              onChangeProgress={handleChangeProgress}
            >
              {images.map((image, indexSlide) => (
                <div
                  className={styles.secondGalleryItem}
                  key={indexSlide}
                  onClick={(e) => handleClickPreview(e, indexSlide)}
                >
                  <Image className={styles.secondGalleryPreview} src={image.src} />
                </div>
              ))}
            </Gallery>
            <ProgressBar className={styles.progressBar} track={track} />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.contentWrapper}>
          <div className={styles.heading}>{preview}</div>
          <div className={styles.text}>{text}</div>
          <Link className={styles.link} to={link} target='_blank'>
            <Button className={styles.button} theme='primary'>
              Читать статью
            </Button>
          </Link>
        </div>
        <div className={styles.contactsWrapper}>
          <div className={styles.socialsWrapper}>
            <div className={styles.share}>Поделиться в соц.сетях</div>
            <Share socials={socials} />
          </div>
          <div className={styles.logoWrapper}>
            <Image className={styles.logo} src={logo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PressDetails);
