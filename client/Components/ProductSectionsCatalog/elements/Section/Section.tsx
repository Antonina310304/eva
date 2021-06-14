import React, { FC, HTMLAttributes, memo, useCallback, useState, ReactElement } from 'react';
import cn from 'classnames';

import ProductCard from '@Components/ProductCard';
import ConstructorStub from '@Components/ConstructorStub';
import Price from '@UI/Price';
import Gallery from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import { ProductModel, ConstructorStubData } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Arrows from '../Arrows';
import styles from './Section.module.css';

export type SectionItem = ProductData | ConstructorStubData;

export interface ItemsProps {
  className?: string;
  children: ReactElement | ReactElement[];
  slide: number;
}

const Items: FC<ItemsProps> = (props) => {
  const { slide, children, ...restProps } = props;
  const { isMobileM } = useMedias();

  return isMobileM ? (
    <Gallery {...restProps} slideIndex={slide}>
      {children}
    </Gallery>
  ) : (
    <div {...restProps}>{children}</div>
  );
};

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  section: ProductModel;
  items: SectionItem[];
}

const Section: FC<SectionProps> = (props) => {
  const { className, section, items, ...restProps } = props;
  const [slide, setSlide] = useState(0);

  const normalizeSlide = useCallback(
    (index: number) => {
      const total = items.length - 1;

      if (index < 0) return 0;
      if (index > total) return total;

      return index;
    },
    [items.length],
  );

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide]);

  return (
    <div {...restProps} className={cn(styles.Section, className)}>
      <div className={styles.head}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{section.name}</h2>
          {section.priceMin && (
            <div className={styles.priceMin}>
              {`от `}
              <Price price={section.priceMin} />
            </div>
          )}
        </div>

        <div className={styles.arrows}>
          <Arrows onPrev={handlePrev} onNext={handleNext} />
        </div>
      </div>

      <Items className={styles.items} slide={slide}>
        {items.map((item, index) => {
          const isStub = item.id === 'stub';

          return (
            <div className={styles.item} key={index}>
              {isStub ? (
                <ConstructorStub stub={item as ConstructorStubData} />
              ) : (
                <ProductCard product={item as ProductData} />
              )}
            </div>
          );
        })}
      </Items>
    </div>
  );
};

export default memo(Section);
