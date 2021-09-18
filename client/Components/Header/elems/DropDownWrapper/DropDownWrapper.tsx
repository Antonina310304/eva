import { FC, HTMLAttributes, ReactChild, memo } from 'react';
import cn from 'classnames';

import styles from './DropDownWrapper.module.css';

export interface DropDownWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactChild;
  isShow?: boolean;
  isFirst: boolean;
}

const DropDownWrapper: FC<DropDownWrapperProps> = ({ isFirst, isShow, children }) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.wrapperShow]: isShow && !isFirst,
        [styles.first]: isFirst,
      })}
    >
      <div
        className={cn(styles.inner, {
          [styles.show]: isShow,
        })}
      >
        <div className={styles.container}>
          <div className={styles.separator}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(DropDownWrapper);
