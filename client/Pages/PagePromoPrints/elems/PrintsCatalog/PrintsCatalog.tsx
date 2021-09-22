import React, { FC, memo, HTMLAttributes, useCallback, useMemo } from 'react';
import loadable from '@loadable/component';

import { CatalogData } from '@Types/Catalog';
import useModals from '@Hooks/useModals';
import Filtrator from '@Stores/Filtrator';

import styles from './PrintsCatalog.module.css';

const ProductMixedCatalog = loadable(() => import('@Components/ProductMixedCatalog'));
const Filters = loadable(() => import('@Pages/PageCategory/elements/Filters'));
const ProductCard = loadable(() => import('@Components/ProductCard'));

interface PrintsCatalogProps extends HTMLAttributes<HTMLDivElement> {
  catalog: CatalogData[];
  page: any;
  onApplyFilters?: (url: string) => void;
  onMore?: (url: string, pageNumber: number) => void;
}

const PrintsCatalog: FC<PrintsCatalogProps> = ({ page, catalog, onApplyFilters, onMore }) => {
  // появление модалки фильтров и логика фильтрации должны заработать корректно после интеграции страницы, т.к. сейчас используются статичные моковые данные
  const [, { openModal, closeModal }] = useModals();

  const renderProduct = useCallback((productProps) => {
    return <ProductCard {...productProps} />;
  }, []);

  const activeSubcategoryIds = useMemo(() => {
    const rubrics: any[] = page.rubrics[0] || [];

    return rubrics
      .filter((rubric) => rubric.actived)
      .map((rubric) => rubric.id)
      .filter(Boolean);
  }, [page.rubrics]);

  const handleMore = useCallback(async () => {
    const url = Filtrator.toUrl({ categories: activeSubcategoryIds });

    if (typeof onMore === 'function') onMore(url, page.page + 1);
  }, [activeSubcategoryIds, onMore, page.page]);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <Filters
          className={styles.filters}
          count={page.productsTotalCount}
          groups={page.groups}
          isMatrasyCategory={page.isMatrasyCategory}
          key='/promo/prints'
          onOpen={hanleOpenFilters}
          onChangeSort={handleApplyFilters}
        />
      </div>
      <div className={styles.catalogWrapper} data-test='catalogWrapper'>
        <ProductMixedCatalog
          className={styles.catalog}
          pages={catalog}
          hasNextPage={catalog[0].productsCountLeft > 0}
          renderProduct={renderProduct}
          onMore={handleMore}
        />
      </div>
    </div>
  );
};

export default memo(PrintsCatalog);
