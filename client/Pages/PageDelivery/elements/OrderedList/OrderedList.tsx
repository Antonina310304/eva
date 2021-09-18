import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import FormattedText from '@Pages/PageDelivery/FormattedText';
import styles from './OrderedList.module.css';

export interface OrderedListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  list: string[];
  currency?: 'BYN' | 'RUB';
}

const OrderedList: FC<OrderedListProps> = (props) => {
  const { className, list, currency, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.list, className)}
      items={list}
      renderChild={(item: string) => (
        <div className={styles.item}>
          <div className={styles.itemContainer}>
            <FormattedText currency={currency}>{item}</FormattedText>
          </div>
        </div>
      )}
    />
  );
};

export default memo(OrderedList);
