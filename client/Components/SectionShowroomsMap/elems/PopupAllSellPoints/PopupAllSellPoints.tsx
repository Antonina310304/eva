import { FC, HTMLAttributes, MouseEvent, memo, useCallback } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import Button from '@UI/Button';
import Scroller from '@UI/Scroller';
import { SellPointData } from '@Types/SellPoints';
import styles from './PopupAllSellPoints.module.css';

export interface PopupAllSellPointsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sellPoints: SellPointData[];
  onClose?: (e: MouseEvent) => void;
  onMore?: (e: MouseEvent, sellPoint: SellPointData) => void;
}

const PopupAllSellPoints: FC<PopupAllSellPointsProps> = (props) => {
  const { className, sellPoints, onClose, onMore, ...restProps } = props;

  const handleMore = useCallback(
    (e, sellPoint) => {
      if (onMore) onMore(e, sellPoint);
    },
    [onMore],
  );

  return (
    <div {...restProps} className={cn(styles.popupAllSellPoints, className)}>
      <div className={styles.head}>
        <div className={styles.title}>Ждём в наших магазинах</div>
        <IconClose className={styles.iconClose} onClick={onClose} />
      </div>

      <Scroller className={styles.scroller}>
        {sellPoints.map((sellPoint) => (
          <div className={styles.item} key={sellPoint.id}>
            <div className={styles.pointIcon} />

            <div className={styles.pointInfo}>
              <div
                className={styles.pointAddress}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: sellPoint.address }}
              />

              <Button
                className={styles.moreInfo}
                onClick={(e) => handleMore(e, sellPoint)}
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
