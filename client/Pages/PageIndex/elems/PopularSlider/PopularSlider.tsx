import { FC, HTMLAttributes, memo } from 'react';

import PopularCard from '@Pages/PageIndex/elems/PopularCard/PopularCard';
import { PopularCategoryData } from '@Types/PopularCategory';
import styles from './PopularSlider.module.css';

export interface PopularSliderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  categories: PopularCategoryData[];
  count: 1 | 3 | 6;
}

const PopularSlider: FC<PopularSliderProps> = ({ categories, count }) => {
  const grids = {
    1: (
      <>
        {categories.map((category) => (
          <PopularCard key={category.id} category={category} cardFit='mobile' />
        ))}
      </>
    ),
    3: (
      <div className={styles.mobileGridM}>
        {categories.map((category, index) => (
          <div className={styles.mobileCardM} key={category.id}>
            <PopularCard category={category} cardFit={!(index % 3) ? 'long' : 'short'} />
          </div>
        ))}
      </div>
    ),
    6: (
      <div className={styles.gridDesktop}>
        {categories.map((category, index) => (
          <div className={styles.cardDesktop} key={category.id}>
            <PopularCard
              category={category}
              cardFit={!(index % 6) || !(index % 5) ? 'long' : 'short'}
            />
          </div>
        ))}
      </div>
    ),
  };

  return grids[count];
};

export default memo(PopularSlider);
