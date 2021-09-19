import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { SellPointData } from '@Pages/PageB2b/typings';
import Button from '@UI/Button';
import LocationIcon from './LocationIcon';
import styles from './SellPoint.module.css';

export interface SellPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sellPoint: SellPointData;
}

const SellPoint: FC<SellPointProps> = ({ className, sellPoint }) => {
  const workTime = sellPoint.worktime.join(' ').toLowerCase();

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.infoBlock}>
        <LocationIcon className={styles.icon} />
        <div className={styles.textBlock}>
          <div
            className={styles.location}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: sellPoint.address }}
          />
          <Button theme='linkSecondary' className={styles.showOnMap}>
            Показать на карте
          </Button>
        </div>
      </div>

      <div className={styles.contactsBlock}>
        <div className={styles.phone}>{sellPoint.phone}</div>
        <div className={styles.workTime}>{workTime}</div>
      </div>
    </div>
  );
};

export default memo(SellPoint);
