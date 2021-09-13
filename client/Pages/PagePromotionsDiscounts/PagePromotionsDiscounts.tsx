import React, { FC, memo } from 'react';

import mockCategories from '@Pages/PagePromotionsDiscounts/elems/Trends/Mock/mockCategories';
import CurrentPromotions from './elems/CurrentPromotions';
import CurrentDiscounts from './elems/CurrentDiscounts';
import FreeServices from './elems/FreeServices';
import Trends from './elems/Trends';
import Top10 from './elems/Top10';

import mockPromoCardData from './mockPromoCardData';

import styles from './PagePromotionDiscounts.module.css';

const eventCards = mockPromoCardData.filter((card) => {
  return card.type === 'event';
});

const serviceCards = mockPromoCardData.filter((card) => {
  return card.type === 'service';
});

const PagePromotionsDiscounts: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Акции и скидки</h1>
      <CurrentPromotions cards={eventCards} />
      <CurrentDiscounts />
      <FreeServices cards={serviceCards} />
      <Trends categories={mockCategories} />
      <Top10 />
    </div>
  );
};

export default memo(PagePromotionsDiscounts);
