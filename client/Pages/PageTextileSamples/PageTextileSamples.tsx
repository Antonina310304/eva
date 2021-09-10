import React, { FC, HTMLAttributes, memo, useMemo, useCallback, useEffect } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import ServicePageTitle from '@Components/ServicePageTitle';
import useOrderFabrics from '@Hooks/useOrderFabrics';
import OrderTextileSamples from './elements/OrderTextileSamples';
import SelectorFabrics from './elements/SelectorFabrics';
import CallBack from './elements/CallBack';
import { PageTextileSamplesData } from './typings';
import styles from './PageTextileSamples.module.css';

export interface PageTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageTextileSamplesData;
  meta: MetaData;
}

const PageTextileSamples: FC<PageTextileSamplesProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { title, orderSamples, ...fabricsData } = page;

  useOrderFabrics(fabricsData);
  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageTitle className={styles.pageTitle} title={title} />

      <OrderTextileSamples className={styles.orderTextileSamples} orderIconsText={orderSamples} />

      <div className={styles.wrapper}>
        <div className={styles.text}>
          Каждую модель в нашем каталоге мы стараемся представить как можно детальней: сделать
          больше ракурсов, крупным планом показать фактуру ткани и декоративные элементы.
        </div>

        <SelectorFabrics page={page} className={styles.textileSelector} />

        <CallBack className={styles.callBack} />
      </div>
    </div>
  );
};

export default memo(PageTextileSamples);
