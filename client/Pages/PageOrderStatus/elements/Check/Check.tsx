import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import PriceContainer from '../PriceContainer';
import styles from './Check.module.css';

export interface CheckItem {
  name: string;
  quantity?: number;
  cost: number;
  isTotal?: boolean;
}

export interface CheckGroup {
  items: CheckItem[];
}

export interface CheckProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  groups: CheckGroup[];
}

const Check: FC<CheckProps> = (props) => {
  const { className, groups, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.check, className)}>
      {groups.map((group, indexGroup) => (
        <div className={styles.group} key={indexGroup}>
          {group.items.map((item, indexItem) => (
            <div className={cn(styles.item, { [styles.isTotal]: item.isTotal })} key={indexItem}>
              <div className={styles.itemName}>{item.name}</div>

              <div className={styles.itemValues}>
                {item.quantity && <div className={styles.itemCount}>{item.quantity}</div>}
                <PriceContainer className={styles.itemCost} price={item.cost} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Check;
