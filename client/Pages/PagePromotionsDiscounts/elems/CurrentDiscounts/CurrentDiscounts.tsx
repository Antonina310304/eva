import React, { FC, memo } from 'react';
import GalleryWithPagination from '@Components/GalleryWithPagination';
import cn from 'classnames';
import { CategoryInterface } from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/Mock/mockCategories';
import NavArrows from '@UI/NavArrows/NavArrows';
import SectionTitle from '@Components/SectionTitle';
import useMedias from '@Hooks/useMedias';
import CategoryGroup from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/CategoryGroup/CategoryGroup';
import styles from './CurrentDiscounts.module.css';

interface CurrentDiscountsProps {
  categories: CategoryInterface[];
  className?: string;
}

const CurrentDiscounts: FC<CurrentDiscountsProps> = ({ categories, className }) => {
  const { isDesktopM, isDesktop, isMobileM, isMobile } = useMedias();

  // в зависимости от ширины экрана получая количество отображаемых карточек
  const getCountCardInSlide = React.useCallback(() => {
    if (isMobile) return 2;
    if (isMobileM) return 4;
    if (isDesktop) return 6;
    if (isDesktopM) return 8;
    return 8;
  }, [isDesktopM, isDesktop, isMobileM, isMobile]);

  const calcCountOfPoints = React.useCallback(() => {
    return Math.ceil(categories.length / getCountCardInSlide());
  }, [categories, getCountCardInSlide]);

  const categoryGroups = React.useMemo(() => {
    const splitCount = getCountCardInSlide();
    const group = new Map();

    categories.forEach((category, index) => {
      const groupIndex = Math.floor(index / splitCount);
      if (!group.has(groupIndex)) group.set(groupIndex, []);
      group.get(groupIndex).push(category);
    });

    return Array.from(group.values());
  }, [categories, getCountCardInSlide]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.galleryWrapper}>
        <GalleryWithPagination
          className={styles.gallery}
          buttons={(handlePrev, handleNext) => (
            <div className={styles.headerWrapper}>
              <SectionTitle title='Актуальные скидки' className={styles.title} />
              {!isMobileM && !isMobile && (
                <NavArrows className={styles.arrows} onPrev={handlePrev} onNext={handleNext} />
              )}
            </div>
          )}
          slides={calcCountOfPoints()}
        >
          {categoryGroups.map((group, index) => (
            <div key={index} className={styles.itemWrapper}>
              <CategoryGroup key={index} categories={group} />
            </div>
          ))}
        </GalleryWithPagination>
      </div>
    </div>
  );
};

export default memo(CurrentDiscounts);
