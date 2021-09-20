import { FC, HTMLAttributes, memo, useCallback, useState, useEffect } from 'react';
import cn from 'classnames';

import * as ApiShowroom from '@Api/Showroom';
import PecomMap from '@Components/PecomMap';
import logger from '@Utils/logger';
import { SellPointData } from '@Types/SellPoints';
import PopupAllSellPoints from '../PopupAllSellPoints';
import PopupSelectedSellPoint from '../PopupSelectedSellPoint';
import styles from './MapWithPopup.module.css';

export interface MapWithPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultSellPoints?: SellPointData[];
}

const MapWithPopup: FC<MapWithPopupProps> = (props) => {
  const { className, defaultSellPoints = [], ...restProps } = props;
  const [visiblePopup, setVisiblePopup] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<SellPointData>(null);
  const [sellPoints, setSellPoints] = useState<SellPointData[]>(defaultSellPoints);

  const loadSellPoints = useCallback(async () => {
    try {
      const res = await ApiShowroom.getSellPoints();

      setSellPoints(res.sellPoints);
    } catch (err) {
      logger(err);
    }
  }, []);

  const handleSelectPoint = useCallback((_e, selectedPickupPoint) => {
    setSelectedPoint(selectedPickupPoint);
    setVisiblePopup(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const handleMore = useCallback((id) => {
    setSelectedPoint(id);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedPoint(null);
  }, []);

  // Если не указаны точки продаж по умолчанию, то загружаем их асинхронно
  useEffect(() => {
    if (defaultSellPoints.length > 0) return;
    if (sellPoints.length > 0) return;

    loadSellPoints();
  }, [loadSellPoints, defaultSellPoints, sellPoints.length]);

  return (
    <div {...restProps} className={cn(styles.mapWithPopup, className)}>
      <PecomMap
        className={styles.map}
        sellPoints={sellPoints}
        selectedPoint={selectedPoint}
        onSelectPickupPoint={handleSelectPoint}
      />

      <div className={cn(styles.popup, { [styles.visible]: visiblePopup })}>
        {selectedPoint ? (
          <PopupSelectedSellPoint
            selectedPoint={selectedPoint}
            onClose={handleClose}
            onBack={handleBack}
          />
        ) : (
          <PopupAllSellPoints sellPoints={sellPoints} onClose={handleClose} onMore={handleMore} />
        )}
      </div>
    </div>
  );
};

export default memo(MapWithPopup);
