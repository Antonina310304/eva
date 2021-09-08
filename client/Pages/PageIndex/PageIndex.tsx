import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import MainSlider from '@Pages/PageIndex/elems/MainSlider';
import Hits from '@Pages/PageIndex/elems/Hits';
import Recommendations from '@Pages/PageIndex/elems/Recommendations';
import Popular from '@Pages/PageIndex/elems/Popular';
import Ideas from '@Pages/PageIndex/elems/Ideas';
import SectionShowroomsMap from '@Components/SectionShowroomsMap/SectionShowroomsMap';
import { pickupPoints, maps } from '@Pages/PageIndex/data';
import Instagram from '@Pages/PageIndex/elems/Instagram';
import NewProducts from '@Pages/PageIndex/elems/NewProducts';

import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <>
        <>
          <MainSlider />
          <Hits />
          <Recommendations />
          <Popular />
          <Ideas />
          <NewProducts />
          <SectionShowroomsMap
            className={styles.map}
            datasForMap={maps}
            pickupPoints={pickupPoints}
          />
          <Instagram />
        </>
      </>
    </div>
  );
};

export default memo(PageIndex);
