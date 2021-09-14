import React, { FC, HTMLAttributes, memo } from 'react';

import PopularCard from '@Pages/PageIndex/elems/PopularCard/PopularCard';
import { PopularCategoryData } from '@Types/PopularCategory';
import styles from './PopularSlider.module.css';

export interface PopularSliderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: PopularCategoryData[];
  count: number;
}

const PopularSlider: FC<PopularSliderProps> = ({ product, count }) => {
  function renderItem() {
    let grid;

    switch (count) {
      case 3:
        grid = (
          <div className={styles.mobileGridM}>
            {product.map((item, index) => {
              return (
                <div className={styles.mobileCardM} key={index}>
                  <PopularCard data={item} cardFit={!(index % 3) ? 'long' : 'short'} />
                </div>
              );
            })}
          </div>
        );
        break;
      case 6:
        grid = (
          <div className={styles.gridDesktop}>
            {product.map((item, index) => {
              return (
                <div className={styles.cardDesktop} key={index}>
                  <PopularCard
                    data={item}
                    cardFit={!(index % 6) || !(index % 5) ? 'long' : 'short'}
                  />
                </div>
              );
            })}
          </div>
        );
        break;
      default:
        grid = (
          <>
            {product.map((item) => (
              <PopularCard key={item.id} data={item} cardFit='mobile' />
            ))}
          </>
        );
    }
    return grid;
  }
  return renderItem();
};

export default memo(PopularSlider);
