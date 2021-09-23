import React, { FC, memo } from 'react';

import { SellPointData } from '@Types/SellPoints';

import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import { MapData } from '@Types/Map';
import styles from './SleeperMap.module.css';

interface SleeperMapInterface {
  pickupPoints: SellPointData[];
  map: MapData;
}

const SleeperMap: FC<SleeperMapInterface> = ({ pickupPoints, map }) => {
  return (
    <div className={styles.wrapper}>
      <SectionShowroomsMap defaultSellPoints={pickupPoints} map={map} />
    </div>
  );
};

export default memo(SleeperMap);
