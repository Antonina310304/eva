import React, { memo, useState } from 'react';
import Burger from '@Components/Header/elems/Burger';
import Slider from '@Components/Header/elems/Slider';
import Search from '@Components/Header/elems/Search';

import MainNavMobile from '@Components/Header/elems/MainNavMobile';
import Sidebar from '@Components/Header/elems/SideBar';
import UserMenu from '@Components/Header/elems/UserMenu';
import UserMenuMobile from '@Components/Header/elems/UserMenuMobile';
import SiteNav from '@Components/Header/elems/SiteNav';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);

  function showSideBar() {
    setIsOpenSideBar(true);
  }

  function hideSideBar() {
    setIsOpenSideBar(false);
  }

  return (
    <div className={styles.wrapper}>
      <Burger onClick={showSideBar} />
      <div className={styles.inner}>
        <Sidebar isOpenSideBar={isOpenSideBar} hideSideBar={hideSideBar}>
          <div>
            <MobileNavContainer className={styles.header}>
              <div className={styles.search}>
                <Search />
              </div>
            </MobileNavContainer>
            <MobileNavContainer>
              <SiteNav />
            </MobileNavContainer>
            <MainNavMobile showSideBar={showSideBar} hideSideBar={hideSideBar} />
            <UserMenuMobile />
          </div>
        </Sidebar>
      </div>
      <div className={styles.wrapper}>
        <Slider />
        <Search />
        <UserMenu />
      </div>
    </div>
  );
};

export default memo(HeaderMobile);
