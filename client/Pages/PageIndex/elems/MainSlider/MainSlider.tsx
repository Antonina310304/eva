import React, { FC, HTMLAttributes, memo } from 'react';
import Timer from '@Components/Timer/Timer';
import Link from '@UI/Link';
import MainSliderData from '@Types/MainSlider';
import useMedias from '@Hooks/useMedias';

import GalleryWithPagination from '@Components/GalleryWithPagination';
import NavSideArrows from '@UI/NavSideArrows/NavSideArrows';
import styles from './MainSlider.module.css';

export interface MainSliderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  slidesList: MainSliderData[];
}

const MainSlider: FC<MainSliderProps> = ({ slidesList }) => {
  const { isMobile } = useMedias();
  function renderSlide({
    period,
    header,
    subtitle,
    textLink,
    link,
    dateEnd,
    images,
  }: MainSliderData) {
    return (
      <div className={styles.slide}>
        <div
          style={{ backgroundImage: `url(${isMobile ? images.mobile : images.desktop}` }}
          className={styles.image}
        />
        <div className={styles.titleWrapper}>
          {period && <p className={styles.date}>{period}</p>}
          {header && <p className={styles.header}>{header}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {link && (
            <Link view='primary' to={link}>
              {textLink}
            </Link>
          )}

          {dateEnd && (
            <div className={styles.footer}>
              <p className={styles.text}>До конца акции</p>
              <Timer time={dateEnd} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.galleryWrapper}>
      <GalleryWithPagination
        className={styles.gallery}
        buttons={(handlePrev, handleNext) => (
          <div className={styles.arrowWrapper}>
            <NavSideArrows onPrev={handlePrev} onNext={handleNext} />
          </div>
        )}
        slides={slidesList.length}
      >
        {slidesList.map((currentSlide) => {
          return (
            <div key={currentSlide.id} className={styles.wrapper}>
              {renderSlide(currentSlide)}
            </div>
          );
        })}
      </GalleryWithPagination>
      <div />
    </div>
  );
};

export default memo(MainSlider);
