import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Parameter.module.css';

export interface Characteristic {
  name: string;
  value: string;
  icon: string;
  unit: string;
}

export interface ParameterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  characteristic: Characteristic;
}

const Parameter: FC<ParameterProps> = (props) => {
  const { className, characteristic, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.parameter, className)}>
      {characteristic.icon && <img className={styles.icon} src={characteristic.icon} alt='' />}
      <span className={styles.value}>{characteristic.value}</span>
    </div>
  );
};

export default memo(Parameter);
