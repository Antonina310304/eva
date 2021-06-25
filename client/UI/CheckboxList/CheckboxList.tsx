import React, { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import { CheckboxItem } from './typings';
import styles from './CheckboxList.module.css';
import Row from './elements/Row';

export interface CheckboxListProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  items: CheckboxItem[];
}

const CheckboxList: FC<CheckboxListProps> = (props) => {
  const { className, items, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.list, className)}
      items={items}
      renderChild={(item: CheckboxItem) => <Row className={styles.row} item={item} />}
    />
  );
};

export default memo(CheckboxList);
