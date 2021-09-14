import React, { FC, memo, HTMLAttributes } from 'react';

import useMedias from '@Hooks/useMedias';
import HeaderMobile from './elems/HeaderMobile';
import HeaderDesktop from './elems/HeaderDesktop';
import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Header: FC<HeaderProps> = () => {
  const { isOnlyMobile } = useMedias();

  return (
    <header className={styles.header}>{isOnlyMobile ? <HeaderMobile /> : <HeaderDesktop />}</header>
  );
};

export default memo(Header);
