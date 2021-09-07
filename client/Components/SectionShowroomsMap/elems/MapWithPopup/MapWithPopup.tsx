import React, { FC, HTMLAttributes, memo, useCallback, useState, useRef } from 'react';
import cn from 'classnames';

import PecomMap from '@Components/PecomMap';
import { SellPointData } from '../../typings';
import PopupAllSellPoints from '../PopupAllSellPoints';
import PopupSelectedSellPoint from '../PopupSelectedSellPoint';
import SelectedIcon from './selectedIcon.png';
import NotSelectedIcon from './notSelectedIcon.svg';
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
  const geoObjects = useRef(null);
  const selectedPlacemark = useRef(null);

  const handleClose = useCallback(() => {
    if (selectedPlacemark) {
      selectedPlacemark.current.options.set({
        iconLayout: 'default#image',
        iconImageHref: NotSelectedIcon,
      });
    }

    setVisiblePopup(false);
  }, []);

  const handleClickMoreInfo = useCallback((id, index) => {
    selectedPlacemark.current = geoObjects.current[index];

    selectedPlacemark.current.options.set({
      iconLayout: 'default#image',
      iconImageHref: SelectedIcon,
    });

    setSelectedPointId(id);
  }, []);

  const handleClickBack = useCallback(() => {
    if (selectedPlacemark) {
      selectedPlacemark.current.options.set({
        iconLayout: 'default#image',
        iconImageHref: NotSelectedIcon,
      });
    }

    setSelectedPointId(null);
  }, []);

  const selectPoint = useCallback((_e, selectedPickupPoint) => {
    if (selectedPlacemark.current) {
      selectedPlacemark.current.options.set({
        iconLayout: 'default#image',
        iconImageHref: NotSelectedIcon,
      });
    }

    selectedPlacemark.current = _e.get('target');

    selectedPlacemark.current.options.set({
      iconLayout: 'default#image',
      iconImageHref: SelectedIcon,
    });

    setSelectedPointId(selectedPickupPoint.id);
    setVisiblePopup(true);
  }, []);

  const getGeoObjects = useCallback((geoObjectsMass) => {
    geoObjects.current = geoObjectsMass.map((item: any) => {
      const obj = { ...item };
      obj.options.set({
        iconLayout: 'default#image',
        iconImageHref: NotSelectedIcon,
        iconImageSize: [52, 44],
      });
      return obj;
    });
  }, []);

  return (
    <div {...restProps} className={cn(styles.mapWithPopup, className)}>
      <PecomMap
        className={styles.map}
        pickupPoints={pickupPoints}
        balloon={false}
        contactsStyle
        onSelectPickupPoint={selectPoint}
        getGeoObjects={getGeoObjects}
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
