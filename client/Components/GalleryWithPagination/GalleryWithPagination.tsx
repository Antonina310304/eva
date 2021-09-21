import { FC, useCallback, useState, MouseEvent, ReactElement, Children, useEffect } from 'react';

import Gallery, { GalleryProps } from '@UI/Gallery';
import GalleryDots from '@UI/GalleryDots';
import styles from './GalleryWithPagination.module.css';

export interface RenderButtonsArgs {
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

export type RenderButtons = (args: RenderButtonsArgs) => ReactElement;

export interface GalleryWithPaginationProps extends GalleryProps {
  renderButtons?: RenderButtons;
}

const GalleryWithPagination: FC<GalleryWithPaginationProps> = (props) => {
  const { className, children, slideIndex, renderButtons, onChangeCurrent, ...restProps } = props;
  const numberOfSlides = Children.count(children);
  const [slide, setSlide] = useState(0);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > numberOfSlides) return numberOfSlides;

      return value;
    },
    [numberOfSlides],
  );

  const handleChangeCurrent = useCallback(
    ({ current }) => {
      setSlide(current);
      if (onChangeCurrent) onChangeCurrent({ current });
    },
    [onChangeCurrent],
  );

  const handleChangeSlide = useCallback(
    (_e, index) => {
      setSlide(index);
      if (onChangeCurrent) onChangeCurrent({ current: index });
    },
    [onChangeCurrent],
  );

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide]);

  useEffect(() => {
    setSlide(slideIndex);
  }, [slideIndex]);

  return (
    <div>
      <div className={className}>
        {renderButtons && renderButtons({ onPrev: handlePrev, onNext: handleNext })}

        <Gallery
          {...restProps}
          className={styles.gallery}
          slideIndex={slide}
          onChangeCurrent={handleChangeCurrent}
        >
          {children}
        </Gallery>
      </div>

      <GalleryDots count={numberOfSlides} actived={slide} onChangeSlide={handleChangeSlide} />
    </div>
  );
};

export default GalleryWithPagination;
