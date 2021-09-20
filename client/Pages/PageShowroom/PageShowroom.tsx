import { FC, HTMLAttributes, memo, useState, useMemo, useCallback } from 'react';

import { Tab } from '@UI/ButtonTabs';
import ServicePageTitle from '@Components/ServicePageTitle';
import SectionShowroomsMap from '@Components/SectionShowroomsMap';
import { MetaData } from '@Types/Meta';
import MainBanner from './elems/MainBanner';
import SellPoints from './elems/SellPoints';
import ShowroomsGallery from './elems/ShowroomsGallery';
import ShowroomProducts from './elems/ShowroomProducts';
import { PageShowroomData } from './typings';
import styles from './PageShowroom.module.css';

export interface PageShowRoomProps extends HTMLAttributes<HTMLDivElement> {
  page: PageShowroomData;
  meta: MetaData;
}

const PageShowRoom: FC<PageShowRoomProps> = (props) => {
  const { page, meta } = props;

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

  const showroomsGalleryTitle = useMemo(() => {
    const titles = {
      rus: 'Магазины Диван.ру',
      blr: 'Магазины Диван.by',
    };

    return titles[meta.country.toLowerCase()];
  }, [meta.country]);

  const handleChangeShoowroom = useCallback((_e, tab: Tab) => {
    setSelectedTab(tab.id);
  }, []);

  return (
    <div className={styles.page}>
      <ServicePageTitle className={styles.title} title={page.title} />

      <MainBanner className={styles.banner} />

      <SellPoints sellPoints={page.sellPoints} />

      <div className={styles.gallery}>
        <ShowroomsGallery
          title={showroomsGalleryTitle}
          tabs={tabs}
          images={selectedShowroom.images}
          onChangeTab={handleChangeShoowroom}
        />
      </div>

      <ShowroomProducts
        key={selectedTab}
        title='Товары в шоу-руме'
        defaultCatalog={defaultCatalog}
      />

      <div className={styles.container}>
        <SectionShowroomsMap className={styles.map} map={page.map} sellPoints={page.sellPoints} />
      </div>
    </div>
  );
};

export default memo(PageShowRoom);
