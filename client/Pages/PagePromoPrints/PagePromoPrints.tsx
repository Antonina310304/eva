import React, { FC, memo } from 'react';

import { CatalogData } from '@Types/Catalog';
import { printSlider } from '@Pages/PagePromoPrints/data';
import PrintsGallery from './elems/PrintsGallery';
import PrintsCatalog from './elems/PrintsCatalog';

import mockPages from './mockPages';
import mockPageData from './mockPageData';

import styles from './PagePromoPrints.module.css';

const pages = (mockPages as unknown) as CatalogData[];

const PagePromoPrints: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Prints</h1>
      <div className={styles.subtitle}>Эксклюзивная коллекция модных обивок</div>
      <PrintsGallery sliderData={printSlider} />
      <PrintsCatalog catalog={pages} page={mockPageData} />
    </div>
  );
};

export default memo(PagePromoPrints);
