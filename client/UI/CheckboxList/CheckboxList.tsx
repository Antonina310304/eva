import React, { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import { CheckboxItemData } from './typings';
import styles from './CheckboxList.module.css';
import Row from './elements/Row';

export interface CheckboxListProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  items: CheckboxItemData[];
  onToggle?: (e: MouseEvent, item: CheckboxItemData) => void;
}

const CheckboxList: FC<CheckboxListProps> = (props) => {
  const { className, items, onToggle, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.list, className)}
      items={items}
      renderChild={(item: CheckboxItemData) => (
        <Row className={styles.row} item={item} onToggle={onToggle} />
      )}
    />
  );
};

export default memo(CheckboxList);
