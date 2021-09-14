import React, { FC, HTMLAttributes, ReactNode, useCallback, useState } from 'react';
import Gallery from '@UI/Gallery';
import Pagination from '@UI/Pagination';

import styles from './GalleryWithPagination.module.css';

export interface GalleryWithPaginationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  slides: number;
  buttons?: (handlePrev: () => void, handleNext: () => void) => void;
}
const GalleryWithPagination: FC<GalleryWithPaginationProps> = ({
  className,
  slides,
  children,
  buttons,
}) => {
  const [slide, setSlide] = useState(0);

  const goToSlide = useCallback((slideIndex) => {
    setSlide(slideIndex);
  }, []);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > slides) return slides;

      return value;
    },
    [slides],
  );

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide]);

  return (
    <div>
      <div className={className}>
        {buttons && buttons(handlePrev, handleNext)}
        <Gallery
          className={styles.gallery}
          slideIndex={slide}
          key={slides}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={() => true}
        >
          {children}
        </Gallery>
      </div>
      <Pagination elementCount={slides} activeElementNumber={slide} goToSlide={goToSlide} />
    </div>
  );
};

export default GalleryWithPagination;
