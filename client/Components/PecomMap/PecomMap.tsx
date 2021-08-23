import React, { FC, HTMLAttributes, memo, useCallback, useEffect } from 'react';
import cn from 'classnames';

import PlacemarkImage from './Placemark.png';
import styles from './PecomMap.module.css';

export interface PecomMapProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pickupPoints: any[];
  selectedPickupPoints?: any[];
  onSelectPickupPoint?: any;
  balloon?: boolean;
}

const id = 'pecom-map';
const PecomMap: FC<PecomMapProps> = (props) => {
  const {
    className,
    pickupPoints,
    selectedPickupPoints = [],
    onSelectPickupPoint,
    balloon = true,
    ...restProps
  } = props;

  // Клик по точке на карте
  const handleClickPlacemark = useCallback(
    (e) => {
      const pickupPoint = e.get('target').properties.get('pickupPoint');

      if (onSelectPickupPoint) onSelectPickupPoint(e, pickupPoint);
    },
    [onSelectPickupPoint],
  );

  // Обработка события инициализации Яндекс.Карты
  const handleInitYMaps = useCallback(() => {
    const map = new window.ymaps.Map(id, {
      center:
        pickupPoints.length > 0
          ? Object.values(pickupPoints[0].coordinates)
          : [55.751574, 37.573856],
      zoom: 7,
      controls: ['zoomControl'],
      behaviors: ["disable('scrollZoom')"],
    });

    pickupPoints.forEach((pickupPoint) => {
      const actived = Boolean(selectedPickupPoints.find((sp) => sp && sp.id === pickupPoint.id));

      // Создание макета содержимого балуна.
      // Макет создается с помощью фабрики макетов с помощью текстового шаблона.
      const BalloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div style="width: 250px">
          {{properties.pickupPoint.address}}
        </div>`,
      );

      const placemark = new window.ymaps.Placemark(
        Object.values(pickupPoint.coordinates),
        {
          pickupPoint,
        },
        {
          balloonContentLayout: balloon && BalloonContentLayout,
          // Запретим замену обычного балуна на балун-панель.
          // Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
          balloonPanelMaxMapArea: 0,
          iconLayout: 'default#image',
          iconImageHref: PlacemarkImage,
          iconImageSize: [41, 49],
          iconImageOffset: [-10, -49],
          zIndex: actived ? 2 : 1,
          zIndexHover: 3,
        },
      );

      placemark.events.add(['click'], handleClickPlacemark);

      map.geoObjects.add(placemark);
    });

    if (pickupPoints.length > 0) map.setBounds(map.geoObjects.getBounds());
  }, [balloon, handleClickPlacemark, pickupPoints, selectedPickupPoints]);

  // Загрузка Яндекс.Карты
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = () => {
      window.ymaps.ready(handleInitYMaps);
    };

    document.head.appendChild(script);
  }, [handleInitYMaps]);

  return <div {...restProps} id={id} className={cn(styles.pecomMap, className)} />;
};

export default memo(PecomMap);
