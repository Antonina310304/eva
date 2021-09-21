import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import { CategoryDiscountData } from '@Pages/PagePromotionsDiscounts/typings';
import GalleryWithPagination from '@Components/GalleryWithPagination';
import NavArrows from '@UI/NavArrows';
import Section from '@Components/Section';
import useMedias from '@Hooks/useMedias';
import CategoryGroup from '../CategoryGroup';
import styles from './CurrentDiscounts.module.css';

interface CurrentDiscountsProps {
  className?: string;
  title: string;
  categories: CategoryDiscountData[];
}

const CurrentDiscounts: FC<CurrentDiscountsProps> = ({ title, categories, className }) => {
  const { isDesktop, isMobileM, isMobile } = useMedias();
  const [slide, setSlide] = useState(0);

  // в зависимости от ширины экрана получая количество отображаемых карточек
  const countCardInSlide = useMemo(() => {
    if (isMobile) return 2;
    if (isMobileM) return 4;
    if (isDesktop) return 6;

    return 8;
  }, [isDesktop, isMobileM, isMobile]);

  const categoryGroups = useMemo(() => {
    const group = new Map();

    categories.forEach((category, index) => {
      const groupIndex = Math.floor(index / countCardInSlide);
      if (!group.has(groupIndex)) group.set(groupIndex, []);
      group.get(groupIndex).push(category);
    });

    return Array.from(group.values());
  }, [categories, countCardInSlide]);

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > categoryGroups.length - 1) return categoryGroups.length - 1;

      return value;
    },
    [categoryGroups.length],
  );

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide]);

  return (
    <Section
      className={cn(className, styles.wrapper)}
      title={title}
      additional={
        <div className={styles.navArrows}>
          <NavArrows onPrev={handlePrev} onNext={handleNext} />
        </div>
      }
    >
      <div className={styles.galleryWrapper}>
        <GalleryWithPagination
          className={styles.gallery}
          slideIndex={slide}
          onChangeCurrent={handleChangeCurrent}
        >
          {categoryGroups.map((group, index) => (
            <div key={index} className={styles.item}>
              <CategoryGroup key={index} categories={group} />
            </div>
          ))}
        </GalleryWithPagination>
      </div>
    </Section>
  );
};

export default memo(CurrentDiscounts);
