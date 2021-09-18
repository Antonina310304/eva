import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import { ProductTagData } from '@Types/Product';
import Tag from './elements/Tag';
import styles from './ProductTags.module.css';

export interface ProductTagsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  tags: ProductTagData[];
}

const ProductTags: FC<ProductTagsProps> = (props) => {
  const { className, tags, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.tags, className)}
      items={tags}
      renderChild={(tag: ProductTagData) => <Tag className={styles.tag} tag={tag} />}
    />
  );
};

export default memo(ProductTags);
