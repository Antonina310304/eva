import React, { FC, memo } from 'react';

import cn from 'classnames';
import { SellPointData } from '@Pages/PageB2b/typings';
import LocationCard from '@Pages/PageShowroom/elems/LocationsList/LocationCard';
import styles from './LocationsList.module.css';

interface LocationListInterface {
  className?: string;
  pickUpPoints: SellPointData[];
}
const LocationsList: FC<LocationListInterface> = ({ className, pickUpPoints }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      {pickUpPoints.map((pickUpPoint, index) => (
        <LocationCard key={index} pickUpPoint={pickUpPoint} className={styles.card} />
      ))}
    </div>
  );
};

export default memo(LocationsList);
