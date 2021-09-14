import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import Container from '@Components/Container';

import NavArrows from '@UI/NavArrows/NavArrows';
import PopularSlider from '@Pages/PageIndex/elems/PopularSlider';
import useMedias from '@Hooks/useMedias';

import GalleryWithPagination from '@Components/GalleryWithPagination';

import Section from '@Components/Section';
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
              <Section
                className={styles.headerWrapper}
                title='Популярные категории'
                additional={
                  <NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
                }
                additionalBreakup
              />
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
