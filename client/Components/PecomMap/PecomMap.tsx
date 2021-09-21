import { FC, HTMLAttributes, memo, useCallback, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import { SellPointData } from '@Types/SellPoints';
import placemarkDefault from './placemarkDefault.svg';
import placemarkActive from './placemarkActive.svg';
import styles from './PecomMap.module.css';

export interface PecomMapProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sellPoints: SellPointData[];
  selectedPoint?: SellPointData;
  onSelectPickupPoint?: (e: MouseEvent, sellPoint: SellPointData) => void;
}

const LoadableYMaps = loadable.lib(() => import('react-yandex-maps'));

const PecomMap: FC<PecomMapProps> = (props) => {
  const { className, sellPoints = [], selectedPoint, onSelectPickupPoint, ...restProps } = props;
  const [innerSelectedPoint, setInnerSelectedPoint] = useState(selectedPoint);

  // Клик по точке на карте
  const handleClickPlacemark = useCallback(
    (e, sellPoint) => {
      setInnerSelectedPoint(sellPoint);

      if (onSelectPickupPoint) onSelectPickupPoint(e, sellPoint);
    },
    [onSelectPickupPoint],
  );

  useEffect(() => {
    setInnerSelectedPoint(selectedPoint);
  }, [selectedPoint]);

  return (
    <div {...restProps} className={cn(styles.pecomMap, className)}>
      <LoadableYMaps>
        {({ YMaps, Map, Placemark }) => {
          return (
            <YMaps>
              <Map
                state={{
                  center: [55.751574, 37.573856],
                  zoom: 7,
                  controls: ['zoomControl', 'fullscreenControl'],
                  behaviors: ["disable('scrollZoom')", 'drag'],
                }}
                modules={['control.ZoomControl', 'control.FullscreenControl']}
                width='100%'
                height='100%'
              >
                {sellPoints.map((sellPoint, index) => {
                  const actived = sellPoint === innerSelectedPoint;
                  const iconImageHref = actived ? placemarkActive : placemarkDefault;

                  return (
                    <Placemark
                      key={index}
                      geometry={sellPoint.coordinates}
                      onClick={(e) => handleClickPlacemark(e, sellPoint)}
                      options={{
                        iconLayout: 'default#image',
                        iconImageHref,
                        iconImageSize: [52, 44],
                        iconImageOffset: [-26, -46],
                        zIndex: actived ? 2 : 1,
                        zIndexHover: 3,
                      }}
                    />
                  );
                })}
              </Map>
            </YMaps>
          );
        }}
      </LoadableYMaps>
    </div>
  );
};

export default memo(PecomMap);
