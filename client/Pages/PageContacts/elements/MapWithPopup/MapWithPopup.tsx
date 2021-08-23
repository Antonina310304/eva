import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import PecomMap from '@Components/PecomMap';
import { SellPointData } from '@Pages/PageContacts/typings';
import PopupAllSellPoints from '../PopupAllSellPoints';
import PopupSelectedSellPoint from '../PopupSelectedSellPoint';
import styles from './MapWithPopup.module.css';

export interface MapWithPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pickupPoints: SellPointData[];
}

const MapWithPopup: FC<MapWithPopupProps> = (props) => {
  const { className, pickupPoints, ...restProps } = props;
  const [visiblePopup, setVisiblePopup] = useState(true);
  const [selectedPointId, setSelectedPointId] = useState(null);
  const selectedPoint = pickupPoints.find((point) => point.id === selectedPointId);

  const handleClose = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const handleClickMoreInfo = useCallback((id) => {
    setSelectedPointId(id);
  }, []);

  const handleClickBack = useCallback(() => {
    setSelectedPointId(null);
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
        // balloon={false}
        onSelectPickupPoint={selectPoint}
      />

      <div className={cn(styles.popup, { [styles.visible]: visiblePopup })}>
        {!selectedPointId ? (
          <PopupAllSellPoints
            pickupPoints={pickupPoints}
            closePopup={handleClose}
            selectPoint={handleClickMoreInfo}
          />
        ) : (
          <PopupSelectedSellPoint
            goBack={handleClickBack}
            selectedPoint={selectedPoint}
            closePopup={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default memo(MapWithPopup);
