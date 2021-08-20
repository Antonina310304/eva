import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import PecomMap from '@Components/PecomMap';
import IconClose from '@UI/IconClose';
import Scroller from '@UI/Scroller';
import Image from '@UI/Image';
import { SellPoint } from '@Pages/PageContacts/typings';
import styles from './MapWithPopup.module.css';

export interface MapWithPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pickupPoints: SellPoint[];
}

const MapWithPopup: FC<MapWithPopupProps> = (props) => {
  const { className, pickupPoints, ...restProps } = props;
  const [visiblePopup, setVisiblePopup] = useState(true);
  const [selectedPointId, setSelectedPointId] = useState('');
  const selectedPoint = pickupPoints.find((point) => point.id === selectedPointId);

  const handleClose = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const handleClickMoreInfo = useCallback((id) => {
    setSelectedPointId(id);
  }, []);

  const handleClickAllPhotos = useCallback(() => {}, []);

  const handleClickBack = useCallback(() => {
    setSelectedPointId('');
  }, []);

  const selectPoint = useCallback((_e, selectedPickupPoint) => {
    setSelectedPointId(selectedPickupPoint.id);
    setVisiblePopup(true);
  }, []);

  return (
    <div {...restProps} className={cn(styles.mapWithPopup, className)}>
      <PecomMap
        className={styles.map}
        pickupPoints={pickupPoints}
        onSelectPickupPoint={selectPoint}
      />

      <div className={cn(styles.popup, { [styles.visible]: visiblePopup })}>
        {selectedPointId === '' ? (
          <div>
            <div className={styles.head}>
              <div className={styles.title}>Ждём в наших магазинах</div>
              <IconClose className={styles.iconClose} onClick={handleClose} />
            </div>

            <Scroller className={styles.scroller}>
              {pickupPoints.map((point) => (
                <div className={styles.item} key={point.id}>
                  <div className={styles.pointIcon} />

                  <div className={styles.pointInfo}>
                    <div
                      className={styles.pointAddress}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: point.address }}
                    />

                    <div className={styles.moreInfo} onClick={() => handleClickMoreInfo(point.id)}>
                      Подробнее
                    </div>
                  </div>
                </div>
              ))}
            </Scroller>
          </div>
        ) : (
          <div>
            <div className={styles.head}>
              <div className={styles.back} onClick={handleClickBack}>
                <div className={styles.arrowBack} />
                <div className={styles.backText}>Назад</div>
              </div>
              <IconClose className={styles.iconClose} onClick={handleClose} />
            </div>

            <Scroller className={styles.scrollerPoint}>
              <div className={styles.pointAddressWrapper}>
                <div
                  className={styles.pointAddress}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: selectedPoint.address }}
                />
              </div>

              <div className={styles.telephone}>{selectedPoint.phone}</div>
              <div className={styles.workTime}>
                {`${selectedPoint.worktime[0]} ${selectedPoint.worktime[1]}`}
              </div>

              {selectedPoint.images.length > 0 && (
                <Image className={styles.image} src={selectedPoint.images[0]} />
              )}

              {selectedPoint.images.length > 1 && (
                <div className={styles.allPhotos} onClick={handleClickAllPhotos}>
                  Смотреть все фото
                </div>
              )}
            </Scroller>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MapWithPopup);
