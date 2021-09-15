import React, { FC, memo } from 'react';

import mockCategories from '@Pages/PagePromotionsDiscounts/elems/Trends/Mock/mockCategories';
import { ProductData } from '@Types/Product';
import { mockCategoriesForCurrentDiscounts } from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/Mock/mockCategories';
import CurrentPromotions from './elems/CurrentPromotions';
import CurrentDiscounts from './elems/CurrentDiscounts';
import FreeServices from './elems/FreeServices';
import Trends from './elems/Trends';
import Top10 from './elems/Top10';

import mockPromoCardData from './mockPromoCardData';
import mockProductsData from './mockProductsData';

import styles from './PagePromotionDiscounts.module.css';

const eventCards = mockPromoCardData.filter((card) => {
  return card.type === 'event';
});

const serviceCards = mockPromoCardData.filter((card) => {
  return card.type === 'service';
});

const mockProducts = (mockProductsData as unknown) as ProductData[]; // скопированы данные, которые приходят с сервера для другого аналогичного компонента

const PagePromotionsDiscounts: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Акции и скидки</h1>
      <CurrentPromotions cards={eventCards} />
      <CurrentDiscounts categories={mockCategoriesForCurrentDiscounts} />
      <FreeServices cards={serviceCards} />
      <Trends categories={mockCategories} />
      <Top10 products={mockProducts} />
    </div>
  );
};

export default memo(PagePromotionsDiscounts);
