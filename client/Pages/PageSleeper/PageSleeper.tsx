import React, { FC, memo } from 'react';

import SleeperGallery from './elems/SleeperGallery';
import FoamSection from './elems/FoamSection';
import QualitySection from './elems/QualitySection';
import CaseAndPackaging from './elems/CaseAndPackaging';
import SleeperBuy from './elems/SleeperBuy';
import SleeperMap from './elems/SleeperMap';

import styles from './PageSleeper.module.css';

const PageSleeper: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Матрасы Sleeper</h1>
      <SleeperGallery />
      <FoamSection />
      <QualitySection />
      <CaseAndPackaging />
      <SleeperBuy />
      <SleeperMap />
    </div>
  );
};

export default memo(PageSleeper);
