import React, { FC, memo } from 'react';

import { printSlider } from '@Pages/PagePromoPrints/data';
import PrintsGallery from './elems/PrintsGallery';
import PrintsCatalog from './elems/PrintsCatalog';

import styles from './PagePromoPrints.module.css';

const PagePromoPrints: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Prints</h1>
      <div className={styles.subtitle}>Эксклюзивная коллекция модных обивок</div>
      <PrintsGallery sliderData={printSlider} />
      <PrintsCatalog />
    </div>
  );
};

export default memo(PagePromoPrints);
