import React, {
  FC,
  HTMLAttributes,
  ReactElement,
  MouseEvent,
  memo,
  useCallback,
  useState,
  cloneElement,
} from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import NavArrows from '@UI/NavArrows';
import ProgressBar from '@UI/ProgressBar';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleSection.module.css';

export interface RenderItem {
  product: ProductData;
}

export interface CrossSaleSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  products: ProductData[];
  defaultCheckedTab?: string;
  tabs?: Tab[];
  renderItem?: (props: RenderItem) => ReactElement;
  onChangeTab?: (e: MouseEvent, tab: Tab) => void;
}

const CrossSaleSection: FC<CrossSaleSectionProps> = (props) => {
  const {
    className,
    title,
    products,
    defaultCheckedTab,
    tabs = [],
    renderItem,
    onChangeTab,
    ...restProps
  } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > products.length) return products.length;

      return value;
    },
    [products.length],
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
      additional={track?.width < 100 && <NavArrows onPrev={handlePrev} onNext={handleNext} />}
    >
      {tabs.length > 0 && (
        <ButtonTabs
          className={styles.tabs}
          defaultValue={defaultCheckedTab}
          tabs={tabs}
          onChangeTab={onChangeTab}
        />
      )}

      <div className={styles.wrapperGallery}>
        <Gallery
          className={styles.gallery}
          cnViewport={styles.galleryViewport}
          slideIndex={slide}
          key={products.length}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {products.map((product) => {
            const item = renderItem({ product });

            return cloneElement(item, { ...item.props, key: product.id });
          })}
        </Gallery>

        <ProgressBar track={track} />
      </div>
    </Section>
  );
};

export default memo(CrossSaleSection);
