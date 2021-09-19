import { FC, HTMLAttributes, memo, useState, useMemo, useCallback } from 'react';

import { Tab } from '@UI/ButtonTabs';
import ServicePageTitle from '@Components/ServicePageTitle';
import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import MainBanner from './elems/MainBanner';
import SellPoints from './elems/SellPoints';
import ShowroomsGallery from './elems/ShowroomsGallery';
import ShowroomProducts from './elems/ShowroomProducts';
import { PageShowroomData } from './typings';
import styles from './PageShowroom.module.css';

export interface PageShowRoomProps extends HTMLAttributes<HTMLDivElement> {
  page: PageShowroomData;
}

const PageShowRoom: FC<PageShowRoomProps> = (props) => {
  const { page } = props;

  const tabs = useMemo(() => {
    const result: Tab[] = [];

    page.sellPoints.forEach((sellPoint) => {
      if (!sellPoint.name || sellPoint.images.length < 1) return;

      result.push({ id: sellPoint.name, label: sellPoint.name });
    });

    return result;
  }, [page.sellPoints]);

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const selectedShowroomIndex = useMemo(() => {
    return page.sellPoints.findIndex((sellPoint) => sellPoint.name === selectedTab);
  }, [page.sellPoints, selectedTab]);

  const selectedShowroom = useMemo(() => {
    return page.sellPoints[selectedShowroomIndex];
  }, [page.sellPoints, selectedShowroomIndex]);

  const defaultCatalog = useMemo(() => {
    return page.categories[selectedShowroomIndex];
  }, [page.categories, selectedShowroomIndex]);

  const handleChangeShoowroom = useCallback((_e, tab: Tab) => {
    setSelectedTab(tab.id);
  }, []);

  return (
    <div className={styles.page}>
      <ServicePageTitle className={styles.title} title='Адреса магазинов' />

      <MainBanner className={styles.banner} />

      <SellPoints sellPoints={page.sellPoints} />

      <ShowroomsGallery
        tabs={tabs}
        images={selectedShowroom.images}
        onChangeTab={handleChangeShoowroom}
      />

      <ShowroomProducts key={selectedTab} defaultCatalog={defaultCatalog} />

      <div className={styles.container}>
        <SectionShowroomsMap className={styles.map} map={page.map} sellPoints={page.sellPoints} />
      </div>
    </div>
  );
};

export default memo(PageShowRoom);
