import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PickupPoint.module.css';

export interface PickupPointProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PickupPoint: FC<PickupPointProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.point, className)}>
      <div className={styles.label}>Адрес пункта самовывоза:</div>
      <div className={styles.address}>{children}</div>
    </div>
  );
};

export default memo(PickupPoint);
