import React, { FC, memo } from 'react';
import { SellPointData } from '@Pages/PageB2b/typings';
import cn from 'classnames';
import LocationIcon from '@Pages/PageShowroom/elems/LocationsList/LocationCard/LocationIcon';
import Button from '@UI/Button';
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
