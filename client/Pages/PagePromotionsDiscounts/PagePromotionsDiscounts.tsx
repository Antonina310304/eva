import { FC, HTMLAttributes, memo } from 'react';

import ServicePageTitle from '@Components/ServicePageTitle';
import { PromoCardData } from '@Components/PromoCard';
import CurrentPromotions from './elems/CurrentPromotions';
import CurrentDiscounts from './elems/CurrentDiscounts';
import FreeServices from './elems/FreeServices';
import Trends from './elems/Trends';
import TopProducts from './elems/TopProducts';
import mocks from './mocks';
import styles from './PagePromotionDiscounts.module.css';

export interface PagePromotionsDiscountsProps extends HTMLAttributes<HTMLDivElement> {
  // TODO: Write types for this
  page: any;
}

const PagePromotionsDiscounts: FC<PagePromotionsDiscountsProps> = (props) => {
  const { page, ...restProps } = props;

  return (
    <div {...restProps}>
      <ServicePageTitle className={styles.title} title={page.title} />

      <CurrentPromotions title='Действующие акции' cards={mocks.events as PromoCardData[]} />

      <CurrentDiscounts title='Актуальные скидки' categories={mocks.categories} />

      <FreeServices
        title='Воспользуйтесь бесплатными услугами'
        cards={mocks.services as PromoCardData[]}
      />

      <Trends title='Будь в тренде: яркий интерьер в деталях' categories={mocks.trends} />

      <TopProducts title='Топ 10 из Divan.Trends' products={page.products} />
    </div>
  );
};

export default memo(PagePromotionsDiscounts);
