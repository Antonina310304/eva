import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import MapWithPopup from './elems/MapWithPopup';
import { MapData, SellPointData } from './typings';
import styles from './SectionShowroomsMap.module.css';

export interface SectionShowroomsMapProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  datasForMap: MapData;
  pickupPoints: SellPointData[];
}

const SectionShowroomsMap: FC<SectionShowroomsMapProps> = (props) => {
  const { className, datasForMap, pickupPoints, ...restProps } = props;
  const { description, title } = datasForMap;

  return (
    <div {...restProps} className={cn(styles.section, className)}>
      <ServicePageParagraphTitle className={styles.title} title={title} />

      <div className={styles.text}>{description}</div>

      <MapWithPopup className={styles.mapWithPopup} pickupPoints={pickupPoints} />
    </div>
  );
};

export default memo(SectionShowroomsMap);
