import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './Dimension.module.css';

export interface Value {
  name: string;
  value: string;
}

export interface DimensionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  value: Value[];
}

const Dimension: FC<DimensionProps> = (props) => {
  const { className, name, value, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.dimension, className)}>
      <div className={styles.name}>{name}</div>
      <List
        className={styles.value}
        items={value}
        renderChild={(item: Value, index) => {
          const isLast = index + 1 === value.length;

          return (
            <div className={styles.valueItem}>
              <div className={styles.valueName}>{item.name}</div>
              <div className={styles.valueValue}>{item.value}</div>
              {!isLast && <div className={styles.delimiter}>x</div>}
            </div>
          );
        }}
      />
    </div>
  );
};

export default memo(Dimension);
