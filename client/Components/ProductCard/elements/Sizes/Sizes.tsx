import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './Sizes.module.css';

export interface SizeData {
  title: string;
  value: string;
}

export interface SizesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sizes: SizeData[];
}

const Sizes: FC<SizesProps> = (props) => {
  const { className, sizes, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.sizes, { [styles.full]: sizes.length > 2 }, className)}
      items={sizes}
      renderChild={(size: SizeData, index) => {
        return (
          <div className={cn(styles.column, { [styles.last]: index > 1 })}>
            <div className={styles.size}>
              <div className={styles.title}>{size.title}</div>
              <div className={styles.value}>{size.value}</div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default memo(Sizes);
