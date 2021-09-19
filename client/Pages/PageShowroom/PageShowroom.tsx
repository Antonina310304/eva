import React, { FC, HTMLAttributes, memo } from 'react';

import ServicePageTitle from '@Components/ServicePageTitle';
import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import MainBanner from './elems/MainBanner';
import SellPoints from './elems/SellPoints';
import ShowroomsGallery from './elems/ShowroomsGallery';
import ShowroomProducts from './elems/ShowroomProducts';
import styles from './PageShowroom.module.css';

export interface PageShowRoomProps extends HTMLAttributes<HTMLDivElement> {
  page: any;
}

const PageShowRoom: FC<PageShowRoomProps> = (props) => {
  const { page } = props;

  return (
    <div className={styles.page}>
      <ServicePageTitle className={styles.title} title='Адреса магазинов' />

      <MainBanner className={styles.banner} />

      <SellPoints sellPoints={page.sellPoints} />

      <ShowroomsGallery sellPoints={page.sellPoints} />

      <ShowroomProducts defaultProducts={page.categories[0].products} />

      <div className={styles.container}>
        <SectionShowroomsMap
          className={styles.map}
          datasForMap={page.map}
          pickupPoints={page.sellPoints}
        />
      </div>
    </div>
  );
};

export default memo(PageShowRoom);
