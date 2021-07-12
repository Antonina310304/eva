import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';

import ProductSectionsCatalog from '@Components/ProductSectionsCatalog';
import ProductMixedCatalog from '@Components/ProductMixedCatalog';
import usePage from '@Queries/usePage';
import Filters from './elements/Filters';
import Subcategories from './elements/Subcategories';
import styles from './PageCategory.module.css';
import PopularLinks from './elements/PopularLinks';

export interface RouteParams {
  slug: string;
}

export interface PageCategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageCategory: FC<PageCategoryProps> = (props) => {
  const { className, ...restProps } = props;
  const { pathname } = useLocation();
  const page = usePage({ path: pathname, ssr: true });

  if (!page.isSuccess) return null;

  const category = page.data;
  const isModels = category.productsModel?.length > 0;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.title}>{category.title}</h1>

      {category.rubrics?.length > 0 && (
        <div className={styles.rubricsWrapper}>
          <Subcategories className={styles.rubrics} subcategories={category.rubrics[0]} />
        </div>
      )}

      <div className={styles.catalogWrapper}>
        <div className={styles.filtersWrapper}>
          <Filters />

          {category.popularLinks?.length > 0 && (
            <div className={styles.popularLinksWrapper}>
              <PopularLinks label='Популярные запросы:' popularLinks={category.popularLinks} />
            </div>
          )}
        </div>

        {isModels ? (
          <ProductSectionsCatalog
            className={styles.catalog}
            sections={category.productsModel}
            products={category.products}
          />
        ) : (
          <ProductMixedCatalog className={styles.catalog} products={category.products} />
        )}
      </div>
    </div>
  );
};

export default memo(PageCategory);
