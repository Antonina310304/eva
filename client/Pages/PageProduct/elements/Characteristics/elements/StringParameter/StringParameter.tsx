import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './StringParameter.module.css';

export interface StringParameterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  value: string;
}

const StringParameter: FC<StringParameterProps> = (props) => {
  const { className, name, value, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.parameter, className)}>
      <span className={styles.name}>{`${name}: `}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default memo(StringParameter);
