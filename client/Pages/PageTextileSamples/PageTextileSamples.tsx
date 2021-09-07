import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import ServicePageTitle from '@Components/ServicePageTitle';
import OrderTextileSamples from './elements/OrderTextileSamples';
import { PageTextileSamplesData } from './typings';
import styles from './PageTextileSamples.module.css';

export interface PageTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageTextileSamplesData;
  meta: MetaData;
}

const PageTextileSamples: FC<PageTextileSamplesProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { title, orderSamples } = page;

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageTitle title={title} />

      <OrderTextileSamples className={styles.orderTextileSamples} orderIconsText={orderSamples} />

      <div className={styles.text}>
        Каждую модель в нашем каталоге мы стараемся представить как можно детальней: сделать больше
        ракурсов, крупным планом показать фактуру ткани и декоративные элементы.
      </div>
    </div>
  );
};

export default memo(PageTextileSamples);
