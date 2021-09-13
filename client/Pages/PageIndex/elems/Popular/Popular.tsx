import React, { FC, HTMLAttributes, useCallback, useState } from 'react';
import cn from 'classnames';
import SectionTitle from '@Components/SectionTitle';
import Container from '@Components/Container';
import PopularCard from '@Pages/PageIndex/elems/PopularCard/PopularCard';

import Gallery from '@UI/Gallery';
import NavArrows from '@UI/NavArrows/NavArrows';
import PopularSlider from '@Pages/PageIndex/elems/PopularSlider';
import useMedias from '@Hooks/useMedias';
import Pagination from '@UI/Pagination';
import GalleryWithPagination from '@Components/GalleryWithPagination';
import NavSideArrows from '@UI/NavSideArrows/NavSideArrows';
import styles from './Popular.module.css';

export interface PopularProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: { title: string; products: any };
}
const Popular: FC<PopularProps> = ({ className, data }) => {
  const { isMobileM, isMobile } = useMedias();

  // в зависимости от ширины экрана получая количество отображаемых слайдеров
  function getCountCardInSlide() {
    let result;
    if (!isMobile && isMobileM) {
      result = 3;
    }
    if (isMobile && isMobileM) {
      result = 1;
    }
    if (!isMobile && !isMobileM) {
      result = 6;
    }
    return result;
  }

  const transformArray = () => {
    if (getCountCardInSlide() === 1) {
      return data.products;
    }
    return data.products.reduce((result, item, index) => {
      if (typeof result[Math.floor(index / getCountCardInSlide())] === 'undefined') {
        // eslint-disable-next-line no-param-reassign
        result = [...result, []];
      }
      result[Math.floor(index / getCountCardInSlide())].push(item);
      return result;
    }, []);
  };

  const productsGroup = transformArray();

  return (
    <div className={cn(className, styles.wrapper)}>
      <Container>
        <div className={styles.galleryWrapper}>
          <GalleryWithPagination
            className={styles.gallery}
            buttons={(handlePrev, handleNext) => (
              <div className={styles.headerWrapper}>
                <SectionTitle title={data.title} className={styles.title} />
                <NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
              </div>
            )}
            slides={productsGroup.length}
          >
            {productsGroup.map((item, index) => {
              return (
                <div className={styles.itemWrapper} key={index}>
                  <PopularSlider count={getCountCardInSlide()} product={item} />
                </div>
              );
            })}
          </GalleryWithPagination>
        </div>
      </Container>
    </div>
  );
};

export default Popular;
