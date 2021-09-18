import { FC, HTMLAttributes, memo, Fragment, useState, useCallback } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import Collapse from '@UI/Collapse';
import { OrderSampleData } from '@Pages/PageTextileSamples/typings';
import OrderRulesItem from '../OrderRulesItem';
import styles from './OrderTextileSamples.module.css';

export interface OrderTextileSamplesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  orderIconsText: OrderSampleData[];
}

const OrderTextileSamples: FC<OrderTextileSamplesProps> = (props) => {
  const { orderIconsText, className, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(true);
  const { isMobileM } = useMedias();

  let styleForText = {};

  if (isMobileM) {
    styleForText = {
      marginTop: '0',
      marginLeft: '20px',
    };
  }

  const handleClickLabel = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div {...restProps} className={cn(styles.orderTextileSamplesBlock, className)}>
      {isMobileM ? (
        <>
          <div className={styles.wrapperLabel} onClick={handleClickLabel}>
            <div className={styles.orderTextileTitle}>Как заказать образцы тканей на дом?</div>
            <div className={cn(styles.iconArrow, { [styles.collapsed]: collapsed })} />
          </div>

          <Collapse collapsed={collapsed}>
            <div className={styles.content}>
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

                      <div className={styles.iconRight} />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Collapse>
        </>
      ) : (
        <>
          <div className={styles.orderTextileTitle}>Как заказать образцы тканей на дом?</div>

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

                  <div className={styles.iconRight} />
                </Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(OrderTextileSamples);
