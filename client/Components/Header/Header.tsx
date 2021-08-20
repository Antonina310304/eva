import React, { FC, memo, HTMLAttributes } from 'react';

import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Header: FC<HeaderProps> = () => {
  return <div className={styles.header}>Header</div>;
};

export default memo(Header);
