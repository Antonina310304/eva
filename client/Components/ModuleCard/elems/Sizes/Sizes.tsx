import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './Sizes.module.css';

export interface SizeData {
  title: string;
  value: number;
}

export interface SizeGroupData {
  title: string;
  values: SizeData[];
}

export interface SizesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  groups: SizeGroupData[];
}

const Sizes: FC<SizesProps> = (props) => {
  const { className, groups, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.sizes, className)}>
      <List
        className={styles.head}
        items={groups[0].values}
        renderChild={(size: SizeData) => <div className={styles.headLabel}>{size.title}</div>}
      />

      <List
        className={styles.groups}
        items={groups}
        renderChild={(group: SizeGroupData) => (
          <div className={styles.group}>
            <div className={styles.groupTitle}>{group.title}</div>
            <List
              className={styles.groupValues}
              items={group.values}
              renderChild={(size: SizeData, index) => {
                const isNotLast = index !== group.values.length - 1;

                return (
                  <div className={styles.size}>
                    <span className={styles.sizeValue}>{size.value}</span>
                    {isNotLast && <span className={styles.sizeSeparator}>x</span>}
                  </div>
                );
              }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default memo(Sizes);
