import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ServicePageParagraphTitle from '@Components/ServicePageParagraphTitle';
import { MapData, SellPointData } from '@Pages/PageContacts/typings';
import MapWithPopup from '../MapWithPopup';
import styles from './SeeUs.module.css';

export interface SeeUsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  datasForMap: MapData;
  pickupPoints: SellPointData[];
}

const SeeUs: FC<SeeUsProps> = (props) => {
  const { className, datasForMap, pickupPoints, ...restProps } = props;
  const { description, title } = datasForMap;

  return (
    <div {...restProps} className={cn(styles.seeUs, className)}>
      <ServicePageParagraphTitle className={styles.title} title={title} />

      <div className={styles.text}>{description}</div>

      <MapWithPopup className={styles.mapWithPopup} pickupPoints={pickupPoints} />
    </div>
  );
};

export default memo(SeeUs);
