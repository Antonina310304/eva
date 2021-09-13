import React, { FC, memo, HTMLAttributes } from 'react';

import useMedias from '@Hooks/useMedias';

import HeaderMobile from '@Components/Header/elems/HeaderMobile';
import HeaderDesktop from '@Components/Header/elems/HeaderDesktop';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Header: FC<HeaderProps> = () => {
  const { isOnlyMobile } = useMedias();

  return <>{isOnlyMobile ? <HeaderMobile /> : <HeaderDesktop />}</>;
};

export default memo(Header);
