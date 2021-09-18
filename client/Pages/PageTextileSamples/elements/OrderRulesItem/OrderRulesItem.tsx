import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { OrderSampleData } from '@Pages/PageTextileSamples/typings';
import styles from './OrderRulesItem.module.css';

export interface OrderRulesItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  iconAndText: OrderSampleData;
  styleForText?: any;
}

const OrderRulesItem: FC<OrderRulesItemProps> = (props) => {
  const { iconAndText, styleForText = {}, className, ...restProps } = props;
  const { image, text } = iconAndText;

  return (
    <div {...restProps} className={cn(styles.orderQueueItem, className)}>
      <div className={styles.itemLogo}>
        <img src={image} alt='' />
      </div>
      <div className={styles.itemText} style={styleForText}>
        {text}
      </div>
    </div>
  );
};

export default memo(OrderRulesItem);