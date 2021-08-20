import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ParagraphTitle from '@Pages/PageCredit/elements/ParagraphTitle';
import { Map, SellPoint } from '@Pages/PageContacts/typings';
import MapWithPopup from '../MapWithPopup';
import styles from './SeeUs.module.css';

export interface SeeUsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  data: Map;
  pickupPoints: SellPoint[];
}

const SeeUs: FC<SeeUsProps> = (props) => {
  const { className, data, pickupPoints, ...restProps } = props;
  const { description, title } = data;

  return (
    <div {...restProps} className={cn(styles.seeUs, className)}>
      <ParagraphTitle className={styles.title} title={title} />

      <div className={styles.text}>{description}</div>

      <MapWithPopup className={styles.mapWithPopup} pickupPoints={pickupPoints} />
    </div>
  );
};

export default memo(SeeUs);
