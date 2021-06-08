import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import useData from '@Hooks/useData';
import ProductCatalog from '@Components/ProductCatalog';
import { PageCategoryData } from './typings';
import styles from './PageCategory.module.css';

export interface PageCategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageCategory: FC<PageCategoryProps> = (props) => {
  const { className, ...restProps } = props;
  const data = useData<PageCategoryData>();

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.title}>{data.title}</h1>

      <ProductCatalog sections={data.productsModel} products={data.products} />
    </div>
  );
};

export default memo(PageCategory);
