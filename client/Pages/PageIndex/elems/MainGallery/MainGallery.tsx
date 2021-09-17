import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import Timer from '@Components/Timer';
import GalleryWithPagination from '@Components/GalleryWithPagination';
import NavSideArrows from '@UI/NavSideArrows';
import Link from '@UI/Link';
import MainSliderData from '@Types/MainSlider';
import styles from './MainGallery.module.css';

export interface MainGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  slides: MainSliderData[];
}

const MainGallery: FC<MainGalleryProps> = (props) => {
  const { className, slides, ...restProps } = props;
  const { isMobile } = useMedias();

  return (
    <div {...restProps} className={cn(styles.galleryWrapper, className)}>
      <GalleryWithPagination
        className={styles.gallery}
        renderButtons={({ onPrev, onNext }) => (
          <div className={styles.arrowWrapper}>
            <NavSideArrows onPrev={onPrev} onNext={onNext} />
          </div>
        )}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={styles.wrapper}>
            <div className={styles.slide}>
              <div
                style={{
                  backgroundImage: `url(${isMobile ? slide.images.mobile : slide.images.desktop}`,
                }}
                className={styles.image}
              />
              <div className={styles.titleWrapper}>
                {slide.period && <p className={styles.date}>{slide.period}</p>}
                {slide.header && <p className={styles.header}>{slide.header}</p>}
                {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}
                {slide.link && (
                  <Link view='primary' to={slide.link}>
                    {slide.textLink}
                  </Link>
                )}

                {slide.dateEnd && (
                  <div className={styles.footer}>
                    <p className={styles.text}>До конца акции</p>
                    <Timer time={slide.dateEnd} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </GalleryWithPagination>
      <div />
    </div>
  );
};

export default memo(MainGallery);
