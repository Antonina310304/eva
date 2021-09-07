import React, { FC, HTMLAttributes, memo, Fragment } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import OrderRulesItem from '../OrderRulesItem';
import styles from './OrderTextileSamples.module.css';

export interface OrderTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const OrderTextileSamples: FC<OrderTextileSamplesProps> = (props) => {
  const { orderIconsText, className, ...restProps } = props;

  const { isMobile } = useMedias();

  let styleForText = {};

  if (isMobile) {
    styleForText = {
      marginTop: '0',
      marginLeft: '30px',
    };
  }

  return (
    <div {...restProps} className={cn(styles.orderTextileSamplesBlock, className)}>
      <div className={styles.OrderTextileTitle}>Как заказать образцы тканей на дом?</div>

      <div className={styles.wrapper}>
        {orderIconsText.map((step, index) => {
          if (orderIconsText.length === index + 1) {
            return (
              <OrderRulesItem
                className={styles.orderRulesItem}
                key={index}
                iconAndText={step}
                styleForText={styleForText}
              />
            );
          }
          return (
            <Fragment key={index}>
              <OrderRulesItem
                className={styles.orderRulesItem}
                iconAndText={step}
                styleForText={styleForText}
              />

              <div className={styles.dots} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default memo(OrderTextileSamples);
