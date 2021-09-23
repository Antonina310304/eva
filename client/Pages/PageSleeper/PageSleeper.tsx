import React, { FC, memo } from 'react';

import mockQualitySection from '@Pages/PageSleeper/elems/QualitySection/Mock/mockQualitySection';

import FoamSection from './elems/FoamSection';
import QualitySection from './elems/QualitySection';
import CaseAndPackaging from './elems/CaseAndPackaging';
import SleeperBuy from './elems/SleeperBuy';
import SleeperMap from './elems/SleeperMap';

import styles from './PageSleeper.module.css';
import SleeperGallery from './elems/SleeperGallery';
import { sleeper } from './data';

const PageSleeper: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Матрасы Sleeper</h1>
      <SleeperGallery {...sleeper} />
      <FoamSection />
      <QualitySection {...mockQualitySection} />
      <CaseAndPackaging />
      <SleeperBuy />
      <SleeperMap />
    </div>
  );
};

export default memo(PageSleeper);
