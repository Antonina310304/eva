import React, { FC, memo, HTMLAttributes } from 'react';

import useMedias from '@Hooks/useMedias';
import HeaderMobile from '@Components/Header/elems/HeaderMobile';
import HeaderDesktop from '@Components/Header/elems/HeaderDesktop';
import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Header: FC<HeaderProps> = () => {
  const { isOnlyMobile } = useMedias();

  return <div className={styles.header}>{isOnlyMobile ? <HeaderMobile /> : <HeaderDesktop />}</div>;
};

export default memo(Header);
