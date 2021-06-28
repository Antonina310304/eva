import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import ProductSectionsCatalog from '@Components/ProductSectionsCatalog';
import ProductMixedCatalog from '@Components/ProductMixedCatalog';
import useCategory from '@Queries/useCategory';
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
  const { slug } = useParams<RouteParams>();
  const category = useCategory({ slug, ssr: true });

  if (!category.isSuccess) return null;

  const { data } = category;
  const isModels = data.productsModel?.length > 0;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.title}>{data.title}</h1>

      {data.rubrics?.length > 0 && (
        <div className={styles.rubricsWrapper}>
          <Subcategories className={styles.rubrics} subcategories={data.rubrics[0]} />
        </div>
      )}

      <div className={styles.catalogWrapper}>
        <div className={styles.filtersWrapper}>
          <Filters />

          {data.popularLinks?.length > 0 && (
            <div className={styles.popularLinksWrapper}>
              <PopularLinks label='Популярные запросы:' popularLinks={data.popularLinks} />
            </div>
          )}
        </div>

        {isModels ? (
          <ProductSectionsCatalog
            className={styles.catalog}
            sections={data.productsModel}
            products={data.products}
          />
        ) : (
          <ProductMixedCatalog className={styles.catalog} products={data.products} />
        )}
      </div>
    </div>
  );
};

export default memo(PageCategory);
