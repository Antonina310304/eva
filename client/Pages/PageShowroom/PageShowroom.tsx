import React, { FC, memo } from 'react';

import pickupPoints, { map } from './data';
import mockMainBannerProps from './elems/MainBanner/Mock/mockMainBannerProps';
import MainBanner from './elems/MainBanner';
import LocationsList from './elems/LocationsList';
import LocationsSlider from './elems/LocationsSlider';
import Showroom from './elems/Showroom';
import MapSection from './elems/MapSection';

import styles from './PageShowroom.module.css';

const PageShowRoom: FC = () => {
  return (
    <div>
      <div className={styles.locationWrapper}>
        <div>
          <h1 className={styles.title}>Адреса магазинов</h1>
          <MainBanner {...mockMainBannerProps} />
        </div>
        <LocationsList pickUpPoints={pickupPoints} />
      </div>
      <LocationsSlider pickupPoints={pickupPoints} />
      <Showroom />
      <MapSection map={map} pickupPoints={pickupPoints} />
    </div>
  );
};

export default memo(PageShowRoom);
