import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { useDebouncedCallback } from 'use-debounce';

import { ApiCategory } from '@Api/Category';
import ProductSectionsCatalog from '@Components/ProductSectionsCatalog';
import ProductMixedCatalog from '@Components/ProductMixedCatalog';
import useModals from '@Hooks/useModals';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { CatalogData } from '@Types/Catalog';
import Filters from './elements/Filters';
import Subcategories from './elements/Subcategories';
import styles from './PageCategory.module.css';
import PopularLinks from './elements/PopularLinks';

export interface PageCategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  slug: string;
}

const PageCategory: FC<PageCategoryProps> = (props) => {
  const { className, page, slug, ...restProps } = props;
  const isModels = page.productsModel?.length > 0;
  const [catalog, setCatalog] = useState<CatalogData>({
    page: page.page,
    products: page.products,
    productsCountLeft: page.productsCountLeft,
    productsPerPage: page.productsPerPage,
    productsTotalCount: page.productsTotalCount,
    productsModel: page.productsModel,
    sectionCountLeft: page.sectionCountLeft,
  });
  const [, { openModal, closeModal }] = useModals();
  const filtrator = useFiltrator({ id: slug, ...page.filters });

  const activeSubcategoryIds = useMemo(() => {
    const rubrics: any[] = page.rubrics[0] || [];

    return rubrics.filter((rubric) => rubric.actived).map((rubric) => rubric.id);
  }, [page.rubrics]);

  const fetchProducts = useCallback(
    (params: { page: number }) => {
      const filters = Filtrator.formatFiltersToObject();

      return ApiCategory.getProducts({
        ...params,
        slug,
        filters,
        categories: activeSubcategoryIds,
      });
    },
    [activeSubcategoryIds, slug],
  );

  const [debouceChangeFilters] = useDebouncedCallback(async () => {
    try {
      const filters = Filtrator.formatFiltersToObject();
      const count = await ApiCategory.getProductsCount({
        slug,
        filters,
        categories: activeSubcategoryIds,
      });

      Filtrator.updateTotalCount(count);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, 300);

  const handleApplyFilters = useCallback(async () => {
    try {
      const newCatalog = await fetchProducts({ page: 1 });

      setCatalog({ ...newCatalog });
      closeModal('Filters');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [closeModal, fetchProducts]);

  const hanleOpenFilters = useCallback(
    (_e, selectedFilterId: string) => {
      openModal('Filters', { selectedFilterId, onApply: handleApplyFilters });
    },
    [handleApplyFilters, openModal],
  );

  const handleMore = useCallback(async () => {
    try {
      const filters = Filtrator.formatFiltersToObject();
      const newCatalog = await ApiCategory.getProducts({
        slug,
        page: catalog.page + 1,
        filters,
        categories: activeSubcategoryIds,
      });

      setCatalog((prev) => ({
        ...newCatalog,
        products: [...prev.products, ...newCatalog.products],
        productsModel: [...prev.productsModel, ...newCatalog.productsModel],
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [activeSubcategoryIds, catalog.page, slug]);

  useEffect(debouceChangeFilters, [debouceChangeFilters, filtrator.selected]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.title}>{page.title}</h1>

      {page.rubrics?.length > 0 && (
        <div className={styles.rubricsWrapper}>
          <div className={styles.rubricsContainer}>
            <Subcategories className={styles.rubrics} subcategories={page.rubrics[0]} />
          </div>
        </div>
      )}

      <div className={styles.catalogWrapper}>
        <div className={styles.filtersWrapper}>
          <Filters count={catalog.productsTotalCount} onOpen={hanleOpenFilters} />

          {page.popularLinks?.length > 0 && (
            <div className={styles.popularLinksWrapper}>
              <PopularLinks label='Популярные запросы:' popularLinks={page.popularLinks} />
            </div>
          )}
        </div>

        {isModels ? (
          <ProductSectionsCatalog
            className={styles.catalog}
            catalog={catalog}
            onMore={handleMore}
          />
        ) : (
          <ProductMixedCatalog className={styles.catalog} catalog={catalog} onMore={handleMore} />
        )}
      </div>
    </div>
  );
};

export default memo(PageCategory);
