import React, { FC, memo } from 'react';

import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import { SellPointData } from '@Pages/PageB2b/typings';
import styles from './MapSection.module.css';

export interface MapSectionProps {
  map: any;
  pickupPoints: SellPointData[];
}

const MapSection: FC<MapSectionProps> = ({ map, pickupPoints }) => {
  return (
    <div className={styles.container}>
      <SectionShowroomsMap className={styles.map} datasForMap={map} pickupPoints={pickupPoints} />
    </div>
  );
};

export default memo(MapSection);
