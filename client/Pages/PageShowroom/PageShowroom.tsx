import React, { FC, memo } from 'react';

import mockPickupPoints from '@Pages/PageShowroom/elems/LocationsList/Mock/mockLocations';
import pickupPoints from '@Pages/PageShowroom/data';
import MainBanner from './elems/MainBanner';
import LocationsList from './elems/LocationsList';
import LocationsSlider from './elems/LocationsSlider';
import Showroom from './elems/Showroom';
import MapSection from './elems/MapSection';

import styles from './PageShowroom.module.css';

const PageShowRoom: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Адреса магазинов</h1>
      <MainBanner />
      <LocationsList />
      <LocationsSlider pickupPoints={pickupPoints} />
      <LocationsList pickUpPoints={mockPickupPoints} />
      <LocationsSlider />
      <Showroom />
      <MapSection />
    </div>
  );
};

export default memo(PageShowRoom);
