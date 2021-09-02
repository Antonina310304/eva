import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';
import { useDebouncedCallback } from 'use-debounce';

import { ApiCategory } from '@Api/Category';
import useModals from '@Hooks/useModals';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import styles from './PageCategory.module.css';

export interface PageCategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  category: any;
  slug: string;
  path: string;
  onApplyFilters?: (url: string) => void;
  onMore?: (url: string, pageNumber: number) => void;
}

const ProductSectionsCatalog = loadable(() => import('@Components/ProductSectionsCatalog'));
const ProductMixedCatalog = loadable(() => import('@Components/ProductMixedCatalog'));
const Filters = loadable(() => import('./elements/Filters'));
const Subcategories = loadable(() => import('./elements/Subcategories'));
const PopularLinks = loadable(() => import('./elements/PopularLinks'));
const ProductCard = loadable(() => import('@Components/ProductCard'));
const MattressesProductCard = loadable(() => import('@Mattresses/MattressesProductCard'));

const PageCategory: FC<PageCategoryProps> = (props) => {
  const { className, page, category, slug, path, onApplyFilters, onMore, ...restProps } = props;
  const [, { openModal, closeModal }] = useModals();
  const filtrator = useFiltrator({ id: `${path}${page.categoryTranslite}`, ...page.filters });
  const isModels = category.data.pages[0].productsModel?.length > 0;

  const activeSubcategoryIds = useMemo(() => {
    const rubrics: any[] = page.rubrics[0] || [];

    return rubrics
      .filter((rubric) => rubric.actived)
      .map((rubric) => rubric.id)
      .filter(Boolean);
  }, [page.rubrics]);

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

  const handleMore = useCallback(async () => {
    const url = Filtrator.toUrl({ categories: activeSubcategoryIds });

    if (typeof onMore === 'function') onMore(url, page.page + 1);
  }, [activeSubcategoryIds, onMore, page.page]);

  const renderProduct = useCallback(
    (productProps) => {
      if (page.isMatrasyCategory) {
        return <MattressesProductCard {...productProps} />;
      }

      return <ProductCard {...productProps} />;
    },
    [page.isMatrasyCategory],
  );

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
          <Filters
            count={page.productsTotalCount}
            groups={page.groups}
            isMatrasyCategory={page.isMatrasyCategory}
            key={path}
            onOpen={hanleOpenFilters}
            onChangeSort={handleApplyFilters}
          />

          {page.popularLinks?.length > 0 && (
            <div className={styles.popularLinksWrapper}>
              <PopularLinks label='Популярные запросы:' popularLinks={page.popularLinks} />
            </div>
          )}
        </div>

        {isModels ? (
          <ProductSectionsCatalog
            autoload
            className={styles.catalog}
            pages={category.data.pages}
            hasNextPage={category.hasNextPage}
            renderProduct={renderProduct}
            onMore={handleMore}
          />
        ) : (
          <ProductMixedCatalog
            autoload
            className={styles.catalog}
            pages={category.data.pages}
            hasNextPage={category.hasNextPage}
            renderProduct={renderProduct}
            onMore={handleMore}
          />
        )}
      </div>
    </div>
  );
};

export default memo(PageCategory);
