import React, { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { ApiCategory } from '@Api/Category';
import ProductSectionsCatalog from '@Components/ProductSectionsCatalog';
import ProductMixedCatalog from '@Components/ProductMixedCatalog';
import useModals from '@Hooks/useModals';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { ProductData } from '@Types/Product';
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
  const [products, setProducts] = useState<ProductData[]>(page.products);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [, { openModal, closeModal }] = useModals();
  const filtrator = useFiltrator(page.filters);

  const handleApplyFilters = useCallback(async () => {
    try {
      const filters = Filtrator.formatFiltersToObject();
      const category = await ApiCategory.getProducts({ slug, page: pageNumber, filters });

      setProducts(category.products);
      closeModal('Filters');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, [closeModal, pageNumber, slug]);

  const hanleOpenAllFilters = useCallback(() => {
    openModal('Filters', { onApply: handleApplyFilters });
  }, [handleApplyFilters, openModal]);

  useEffect(() => {
    Filtrator.updateTotalCount({ category: slug });
  }, [filtrator.selected, slug]);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.title}>{page.title}</h1>

      {page.rubrics?.length > 0 && (
        <div className={styles.rubricsWrapper}>
          <Subcategories className={styles.rubrics} subcategories={page.rubrics[0]} />
        </div>
      )}

      <div className={styles.catalogWrapper}>
        <div className={styles.filtersWrapper}>
          <Filters onOpenAll={hanleOpenAllFilters} />

          {page.popularLinks?.length > 0 && (
            <div className={styles.popularLinksWrapper}>
              <PopularLinks label='Популярные запросы:' popularLinks={page.popularLinks} />
            </div>
          )}
        </div>

        {isModels ? (
          <ProductSectionsCatalog
            className={styles.catalog}
            sections={page.productsModel}
            products={products}
          />
        ) : (
          <ProductMixedCatalog className={styles.catalog} products={products} />
        )}
      </div>
    </div>
  );
};

export default memo(PageCategory);
