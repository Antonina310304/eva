import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { SellPointData } from '@Types/SellPoints';
import SellPoint from '../SellPoint';
import styles from './SellPoints.module.css';

export interface SellPointsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sellPoints: SellPointData[];
}

const SellPoints: FC<SellPointsProps> = (props) => {
  const { className, sellPoints, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      {sellPoints.map((sellPoint, index) => (
        <SellPoint key={index} sellPoint={sellPoint} className={styles.item} />
      ))}
    </div>
  );
};

export default memo(SellPoints);
