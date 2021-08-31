import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  memo,
  useCallback,
  useState,
  cloneElement,
} from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import NavArrows from '@UI/NavArrows';
import ProgressBar from '@UI/ProgressBar';
import { ProductData } from '@Types/Product';
import { CartPositionData } from '@Types/Cart';
import styles from './PositionsSection.module.css';

export interface RenderItem {
  product: ProductData;
  quantity: number;
}

export interface PositionsSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  positions: CartPositionData[];
  renderItem?: (props: RenderItem) => ReactElement;
}

const PositionsSection: FC<PositionsSectionProps> = (props) => {
  const { className, title, positions, renderItem, ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > positions.length) return positions.length;

      return value;
    },
    [positions.length],
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
      title={title}
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
          key={positions.length}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {positions.map((position) => {
            const item = renderItem({ product: position.products[0], quantity: position.quantity });

            return cloneElement(item, { ...item.props, key: position.id });
          })}
        </Gallery>

        <ProgressBar track={track} />
      </div>
    </Section>
  );
};

export default memo(PositionsSection);
