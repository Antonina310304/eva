import React, { FC, memo } from 'react';
import { SellPointData } from '@Pages/PageB2b/typings';
import cn from 'classnames';
import Button from '@UI/Button';
import LocationIcon from './LocationIcon';
import styles from './LocationCard.module.css';

interface LocationCardProps {
  className?: string;
  pickUpPoint: SellPointData;
}

const LocationCard: FC<LocationCardProps> = ({ className, pickUpPoint }) => {
  const workTime = React.useMemo(() => {
    return pickUpPoint.worktime.reduce((acc, item) => {
      return `${acc} ${item.toLowerCase()}`;
    }, '');
  }, [pickUpPoint]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.infoBlock}>
        <LocationIcon className={styles.icon} />
        <div className={styles.textBlock}>
          <div
            className={styles.location}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pickUpPoint.address }}
          />
          <Button theme='linkSecondary' className={styles.showOnMap}>
            Показать на карте
          </Button>
        </div>
      </div>

      <div className={styles.contactsBlock}>
        <div className={styles.phone}>{pickUpPoint.phone}</div>
        <div className={styles.workTime}>{workTime}</div>
      </div>
    </div>
  );
};

export default memo(LocationCard);
