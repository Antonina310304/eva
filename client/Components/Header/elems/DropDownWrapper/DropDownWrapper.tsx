import React, { FC, HTMLAttributes, ReactChild } from 'react';
import cn from 'classnames';
import Container from '@Components/Container';
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
        <Container>
          <div className={styles.separator}>{children}</div>
        </Container>
      </div>
    </div>
  );
};

export default DropDownWrapper;
