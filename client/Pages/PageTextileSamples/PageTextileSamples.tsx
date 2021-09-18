import { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import ServicePageTitle from '@Components/ServicePageTitle';
import Filtrator from '@Stores/Filtrator';
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
  const { title, orderSamples } = page;

  // Подготавливаем данные под формат, воспринимаемый Фильтратором
  const colorsFilter = useMemo(() => {
    return Object.values(page.tags.colors).map((color) => {
      return {
        parameterId: '40',
        type: 'variant',
        name: color.title,
        value: [color.id],
        meta: {
          color: color.code,
        },
      };
    });
  }, [page.tags.colors]);

  const typesFilter = useMemo(() => {
    return Object.values(page.tags.types).map((type) => {
      return {
        parameterId: '10',
        type: 'variant',
        name: type.title,
        value: [type.id],
        meta: {
          color: '',
        },
      };
    });
  }, [page.tags.types]);

  const collectionsFilter = useMemo(() => {
    return Object.values(page.tags.collections).map((collection) => {
      return {
        parameterId: '20',
        type: 'variant',
        name: collection.title,
        value: [collection.id],
        meta: {
          color: '',
        },
      };
    });
  }, [page.tags.collections]);

  const filters: any = useMemo(() => {
    return {
      id: 'textileSamples',
      inited: false,
      filters: [
        {
          id: '1',
          name: 'Цвет',
          theme: 'checkbox',
          items: [
            {
              theme: 'checkbox',
              parameterId: '40',
            },
          ],
        },
        {
          id: '2',
          name: 'Свойства',
          theme: 'checkbox',
          items: [
            {
              theme: 'checkbox',
              parameterId: '10',
            },
          ],
        },
        {
          id: '3',
          name: 'Коллекция',
          theme: 'checkbox',
          items: [
            {
              theme: 'checkbox',
              parameterId: '20',
            },
          ],
        },
      ],
      parameterValues: [...colorsFilter, ...typesFilter, ...collectionsFilter],
      parameters: {
        '40': {
          name: 'Цвет',
          unit: '',
          default: [],
        },
        '10': {
          name: 'Свойства',
          unit: '',
          default: [],
        },
        '20': {
          name: 'Коллекция',
          unit: '',
          default: [],
        },
      },
    };
  }, [collectionsFilter, colorsFilter, typesFilter]);

  Filtrator.init({ ...filters });

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageTitle className={styles.pageTitle} title={title} />

      <OrderTextileSamples className={styles.orderTextileSamples} orderIconsText={orderSamples} />

      <div className={styles.wrapper}>
        <div className={styles.text}>
          Каждую модель в нашем каталоге мы стараемся представить как можно детальней: сделать
          больше ракурсов, крупным планом показать фактуру ткани и декоративные элементы.
        </div>

        <SelectorFabrics pageData={page} className={styles.textileSelector} />

        <CallBack className={styles.callBack} />
      </div>
    </div>
  );
};

export default memo(PageTextileSamples);
