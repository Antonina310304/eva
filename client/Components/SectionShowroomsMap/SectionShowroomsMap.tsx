import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import { MapData } from '@Types/Map';
import { SellPointData } from '@Types/SellPoints';
import MapWithPopup from './elems/MapWithPopup';
import styles from './SectionShowroomsMap.module.css';

export interface SectionShowroomsMapProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  map: MapData;
  defaultSellPoints?: SellPointData[];
}

const SectionShowroomsMap: FC<SectionShowroomsMapProps> = (props) => {
  const { className, map, defaultSellPoints, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.section, className)}>
      {map.title && <ServicePageParagraphTitle className={styles.title} title={map.title} />}
      {map.description && <div className={styles.text}>{map.description}</div>}

      <MapWithPopup className={styles.mapWithPopup} defaultSellPoints={defaultSellPoints} />
    </div>
  );
};

export default memo(SectionShowroomsMap);
