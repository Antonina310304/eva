import { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './IconPaySystem.module.css';

export interface IconPaySystemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: string;
  name: string;
}

const IconPaySystem: FC<IconPaySystemProps> = ({ icon, name }) => {
  return (
    <div
      className={cn(styles.icon, {
        [styles.masterCard]: icon === 'masterCard',
        [styles.visa]: icon === 'visa',
        [styles.mir]: icon === 'mir',
      })}
    >
      {name}
    </div>
  );
};

export default memo(IconPaySystem);
