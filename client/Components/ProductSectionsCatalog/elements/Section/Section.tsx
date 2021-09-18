import { FC, HTMLAttributes, ReactElement, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import ConstructorStub from '@Components/ConstructorStub';
import Price from '@UI/Price';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import useMedias from '@Hooks/useMedias';
import { ProductModel, ConstructorStubData } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Arrows from '../Arrows';
import styles from './Section.module.css';

export interface RenderProductParams {
  product?: ProductData;
}

export type RenderProduct = (params: RenderProductParams) => ReactElement;

export type SectionItem = ProductData | ConstructorStubData;

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  productModel: ProductModel;
  items: SectionItem[];
  renderProduct?: RenderProduct;
}

const Section: FC<SectionProps> = (props) => {
  const { className, productModel, items, renderProduct, ...restProps } = props;
  const { isMobileM } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > items.length) return items.length;

      return value;
    },
    [items.length],
  );

  const renderItems = useCallback(() => {
    return items.map((item, index) => {
      const isStub = item.id === 'stub';

      return (
        <div className={cn(styles.item, styles.stub)} key={index}>
          {isStub ? (
            <ConstructorStub stub={item as ConstructorStubData} />
          ) : (
            <>{renderProduct({ product: item as ProductData })}</>
          )}
        </div>
      );
    });
  }, [items, renderProduct]);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track.finished) return;

    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  const handleChangeCurrent = useCallback((params) => {
    setSlide(params.current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  return (
    <div {...restProps} className={cn(styles.section, className)}>
      <div className={styles.head}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{productModel.name}</h2>
          {productModel.priceMin && (
            <div className={styles.priceMin}>
              {`от `}
              <Price price={productModel.priceMin} />
            </div>
          )}
        </div>

        {track?.width < 100 && (
          <div className={styles.arrows}>
            <Arrows onPrev={handlePrev} onNext={handleNext} />
          </div>
        )}
      </div>

      {isMobileM ? (
        <Gallery
          className={styles.items}
          slideIndex={slide}
          onChangeCurrent={handleChangeCurrent}
          onChangeProgress={handleChangeProgress}
        >
          {renderItems()}
        </Gallery>
      ) : (
        <div className={styles.items}>{renderItems()}</div>
      )}

      {isMobileM && <ProgressBar track={track} />}
    </div>
  );
};

export default memo(Section);
