import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import useProduct from '@Queries/useProduct';
import styles from './PageProduct.module.css';

export interface RouteParams {
  slug: string;
}

export interface PageProductProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageProduct: FC<PageProductProps> = (props) => {
  const { className, ...restProps } = props;
  const { slug } = useParams<RouteParams>();
  const product = useProduct({ slug });

  if (!product.isSuccess) return null;

  const { data } = product;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.title}>EVA / PageProduct</div>
    </div>
  );
};

export default memo(PageProduct);
