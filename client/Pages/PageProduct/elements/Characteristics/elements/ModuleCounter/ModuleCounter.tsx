import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ModuleCounter.module.css';

export interface ModuleCounterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  count: number;
}

const ModuleCounter: FC<ModuleCounterProps> = (props) => {
  const { className, name, count, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.parameter, className)}>
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{`${count} шт.`}</span>
    </div>
  );
};

export default memo(ModuleCounter);
