import React, { FC, HTMLAttributes, memo, useMemo, useCallback, useEffect } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import ServicePageTitle from '@Components/ServicePageTitle';
import useOrderFabrics from '@Hooks/useOrderFabrics';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import loadable from '@loadable/component';
import { useDebouncedCallback } from 'use-debounce';
import { ApiCategory } from '@Api/Category';
import useModals from '@Hooks/useModals';
import OrderTextileSamples from './elements/OrderTextileSamples';
import SelectorFabrics from './elements/SelectorFabrics';
import CallBack from './elements/CallBack';
import { PageTextileSamplesData } from './typings';
import styles from './PageTextileSamples.module.css';

const Filters = loadable(() => import('./elements/Filters'));

export interface PageTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageTextileSamplesData;
  meta: MetaData;
}

const PageTextileSamples: FC<PageTextileSamplesProps> = (props) => {
  const { className, page, meta, slug, path, onApplyFilters, ...restProps } = props;
  const { title, orderSamples, ...fabricsData } = page;
  const [, { openModal, closeModal }] = useModals();

  useOrderFabrics(fabricsData);
  console.log('page', page);

  const colors = Object.values(page.tags.colors).map((color) => {
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

  const types = Object.values(page.tags.types).map((type) => {
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

  const collections = Object.values(page.tags.collections).map((collection) => {
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

  const filters = {
    filters: [
      {
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
    parameterValues: [...colors, ...types, ...collections],
    parameters: {
      40: {
        name: 'Цвет',
        unit: '',
        default: [],
      },
      10: {
        name: 'Свойства',
        unit: '',
        default: [],
      },
      20: {
        name: 'Коллекция',
        unit: '',
        default: [],
      },
    },
  };

  const activeSubcategoryIds = useMemo(() => {
    const rubrics: any[] = [];

    return rubrics
      .filter((rubric) => rubric.actived)
      .map((rubric) => rubric.id)
      .filter(Boolean);
  }, []);

  // const [debouceChangeFilters] = useDebouncedCallback(async () => {
  //   try {
  //     const filters = Filtrator.formatFiltersToObject();
  //     const count = await ApiCategory.getProductsCount({
  //       slug,
  //       filters,
  //       categories: activeSubcategoryIds,
  //     });

  //     Filtrator.updateTotalCount(count);
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.log(err);
  //   }
  // }, 300);

  const handleApplyFilters = useCallback(async () => {
    const url = Filtrator.toUrl({ categories: activeSubcategoryIds });

    window.history.pushState({}, '', url);
    closeModal('Filters');

    if (onApplyFilters) onApplyFilters(url);
  }, [activeSubcategoryIds, closeModal, onApplyFilters]);

  const hanleOpenFilters = useCallback(
    (_e, selectedFilterId: string) => {
      openModal('Filters', { selectedFilterId, onApply: handleApplyFilters });
    },
    [handleApplyFilters, openModal],
  );

  const filtrator = useFiltrator({ id: 'xz', ...filters });
  console.log('filtrator', filtrator);

  // useEffect(debouceChangeFilters, [debouceChangeFilters, filtrator.selected]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageTitle className={styles.pageTitle} title={title} />

      <div className={styles.filtersWrapper}>
        <Filters
          // count={page.productsTotalCount}
          // groups={page.groups}
          // isMatrasyCategory={page.isMatrasyCategory}
          // key={path}
          onOpen={hanleOpenFilters}
          onChangeSort={handleApplyFilters}
        />
      </div>

      <OrderTextileSamples className={styles.orderTextileSamples} orderIconsText={orderSamples} />

      <div className={styles.wrapper}>
        <div className={styles.text}>
          Каждую модель в нашем каталоге мы стараемся представить как можно детальней: сделать
          больше ракурсов, крупным планом показать фактуру ткани и декоративные элементы.
        </div>

        <SelectorFabrics className={styles.textileSelector} />

        <CallBack className={styles.callBack} />
      </div>
    </div>
  );
};

export default memo(PageTextileSamples);
