import React, { FC, HTMLAttributes, memo } from 'react';

import ServicePageTitle from '@Components/ServicePageTitle';
import MainBanner from './elems/MainBanner';
import styles from './PageShowroom.module.css';

export interface PageShowRoomProps extends HTMLAttributes<HTMLDivElement> {
  page: any;
}

const PageShowRoom: FC<PageShowRoomProps> = () => {
  return (
    <div className={styles.page}>
      <ServicePageTitle className={styles.title} title='Адреса магазинов' />
      <MainBanner className={styles.banner} />
    </div>
  );
};

export default memo(PageShowRoom);
