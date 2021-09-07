import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import Button from '@UI/Button';
import Scroller from '@UI/Scroller';
import { SellPointData } from '../../typings';
import styles from './PopupAllSellPoints.module.css';

export interface PopupAllSellPointsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pickupPoints: SellPointData[];
  closePopup: () => void;
  selectPoint: (id: string, index: number) => void;
}

const PopupAllSellPoints: FC<PopupAllSellPointsProps> = (props) => {
  const { className, pickupPoints, closePopup, selectPoint, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.popupAllSellPoints, className)}>
      <div className={styles.head}>
        <div className={styles.title}>Ждём в наших магазинах</div>
        <IconClose className={styles.iconClose} onClick={closePopup} />
      </div>

      <Scroller className={styles.scroller}>
        {pickupPoints.map((point, index) => (
          <div className={styles.item} key={point.id}>
            <div className={styles.pointIcon} />

            <div className={styles.pointInfo}>
              <div
                className={styles.pointAddress}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: point.address }}
              />

              <Button
                className={styles.moreInfo}
                onClick={() => selectPoint(point.id, index)}
                theme='linkSecondary'
              >
                Подробнее
              </Button>
            </div>
          </div>
        ))}
      </Scroller>
    </div>
  );
};

export default memo(PopupAllSellPoints);
