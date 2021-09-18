import {
  FC,
  HTMLAttributes,
  useCallback,
  useState,
  MouseEvent,
  ReactElement,
  Children,
} from 'react';

import Gallery from '@UI/Gallery';
import GalleryDots from '@UI/GalleryDots';
import styles from './GalleryWithPagination.module.css';

export interface RenderButtonsArgs {
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

export type RenderButtons = (args: RenderButtonsArgs) => ReactElement;

export interface GalleryWithPaginationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  renderButtons?: RenderButtons;
}
const GalleryWithPagination: FC<GalleryWithPaginationProps> = (props) => {
  const { className, children, renderButtons, ...restProps } = props;
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

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeSlide = useCallback((_e, index) => {
    setSlide(index);
  }, []);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide]);

  return (
    <div {...restProps}>
      <div className={className}>
        {renderButtons && renderButtons({ onPrev: handlePrev, onNext: handleNext })}

        <Gallery
          className={styles.gallery}
          slideIndex={slide}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={() => true}
        >
          {children}
        </Gallery>
      </div>

      <GalleryDots count={numberOfSlides} actived={slide} onChangeSlide={handleChangeSlide} />
    </div>
  );
};

export default GalleryWithPagination;
