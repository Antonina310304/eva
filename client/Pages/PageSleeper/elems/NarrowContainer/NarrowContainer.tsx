import React, { FC, memo, HTMLAttributes, ReactChild } from 'react';
import styles from './NarrowContainer.module.css';

interface NarrowContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactChild | ReactChild[];
}

const NarrowContainer: FC<NarrowContainerProps> = ({ children }) => {
  return <div className={styles.narrow}>{children}</div>;
};

export default memo(NarrowContainer);
