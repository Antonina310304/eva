import { FC, HTMLAttributes, useMemo } from 'react';
import cn from 'classnames';

import NavArrows from '@UI/NavArrows';
import useMedias from '@Hooks/useMedias';
import GalleryWithPagination from '@Components/GalleryWithPagination';
import Section from '@Components/Section';
import { PopularCategoryData } from '@Types/PopularCategory';
import PopularSlider from '../PopularSlider';
import styles from './Popular.module.css';

export interface PopularProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  categories: PopularCategoryData[];
}

const Popular: FC<PopularProps> = (props) => {
  const { className, title, categories, ...restProps } = props;
  const { isMobileM, isMobile } = useMedias();

  // В зависимости от ширины экрана получаем количество отображаемых слайдов
  const countCardsInSlide = useMemo(() => {
    if (isMobile) return 1;
    if (isMobileM) return 3;

    return 6;
  }, [isMobile, isMobileM]);

  // Разбиваем категории на группы, 1 группа = 1 слайд
  const groups = useMemo(() => {
    const result: PopularCategoryData[][] = [];

    categories.forEach((category, indexCategory) => {
      const index = Math.floor(indexCategory / countCardsInSlide);

      if (!result[index]) result[index] = [];
      result[index].push(category);
    });

    return result;
  }, [categories, countCardsInSlide]);

  return (
    <div {...restProps} className={cn(className, styles.wrapper)}>
      <div className={styles.container}>
        <div className={styles.galleryWrapper}>
          <GalleryWithPagination
            className={styles.gallery}
            renderButtons={({ onNext, onPrev }) => (
              <Section
                className={styles.headerWrapper}
                title={title}
                arrows={<NavArrows className={styles.arrows} onPrev={onPrev} onNext={onNext} />}
              />
            )}
          >
            {groups.map((groupCategories, index) => (
              <div className={styles.itemWrapper} key={index}>
                <PopularSlider count={countCardsInSlide} categories={groupCategories} />
              </div>
            ))}
          </GalleryWithPagination>
        </div>
      </div>
    </div>
  );
};

export default Popular;
