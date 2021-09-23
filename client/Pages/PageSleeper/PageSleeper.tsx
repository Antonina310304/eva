import React, { FC, memo } from 'react';

import mockQualitySection from '@Pages/PageSleeper/elems/QualitySection/Mock/mockQualitySection';
import { pickupPoints } from '@Pages/PageIndex/data';
import { map } from '@Pages/PageSleeper/elems/SleeperMap/Mock/mockSleeperMap';
import Questions from '@Pages/PageSleeper/elems/Questions/Questions';
import BottomBanner from '@Pages/PageSleeper/elems/BottomBanner/BottomBanner';
import SleeperGallery from './elems/SleeperGallery';

import FoamSection from './elems/FoamSection';
import QualitySection from './elems/QualitySection';
import CaseAndPackaging from './elems/CaseAndPackaging';
import SleeperBuy from './elems/SleeperBuy';
import SleeperMap from './elems/SleeperMap';

import styles from './PageSleeper.module.css';

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
      <SleeperMap pickupPoints={pickupPoints} map={map} />
      <Questions />
      <BottomBanner />
    </div>
  );
};

export default memo(PageSleeper);
