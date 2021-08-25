import React, { memo, useState } from 'react';
import Burger from '@Components/Header/elems/Burger';
import Slider from '@Components/Header/elems/Slider';
import Search from '@Components/Header/elems/Search';

import MainNavMobile from '@Components/Header/elems/MainNavMobile';
import Sidebar from '@Components/Header/elems/SideBar';
import UserMenu from '@Components/Header/elems/UserMenu';
import SiteNav from '@Components/Header/elems/SiteNav';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import { useSpring, animated } from 'react-spring';

import Overlay from '@Components/Overlay';
import Container from '@Components/Container';
import UserBottomMenuMobile from '@Components/Header/elems/UserBottomMenuMobile';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);

  function showSideBar() {
    setIsOpenSideBar(true);
  }

  function hideSideBar() {
    setIsOpenSideBar(false);
  }

  const [{ left }, api] = useSpring(() => ({
    from: { left: `0%` },
    config: { duration: 300 },
  }));

  function backMainMenu() {
    api.start({
      left: `0%`,
      onRest: () => {
        // меняет z-index у выпадающего меню после окончания анимации
        setIsShowSubMenu(false);
      },
    });
  }

  function showDropDown() {
    api.start({
      left: `-100%`,
    });
  }

  return (
    <header className={styles.head}>
      <Container className={styles.wrapper}>
        <Overlay isOpen={isOpenSideBar} onClick={hideSideBar} />
        <Burger onClick={showSideBar} className={styles.burger} />
        <div className={styles.wrapper}>
          <div className={styles.sliderWrapper}>
            <Slider />
          </div>
          <div className={styles.flexWrapper}>
            <div className={styles.dMobileMWrapper}>
              <Search />
              <UserMenu />
            </div>
          </div>
        </div>
      </Container>
      <Sidebar backMainMenu={backMainMenu} isOpenSideBar={isOpenSideBar} hideSideBar={hideSideBar}>
        <animated.div style={{ left }} className={styles.inner}>
          <div data-scroll='scroll' className={styles.inWrap}>
            <MobileNavContainer className={styles.header}>
              <div className={styles.wrapper}>
                <div className={styles.search}>
                  <Search />
                </div>
                <button className={styles.close} onClick={hideSideBar} type='button'>
                  закрыть
                </button>
              </div>
            </MobileNavContainer>
            <MobileNavContainer>
              <SiteNav />
            </MobileNavContainer>
            <MainNavMobile
              showDropDown={showDropDown}
              backMainMenu={backMainMenu}
              showSideBar={showSideBar}
              hideSideBar={hideSideBar}
              isOpenSideBar={isOpenSideBar}
              isShowSubMenu={isShowSubMenu}
              setIsShowSubMenu={setIsShowSubMenu}
            />
            <UserBottomMenuMobile />
          </div>
        </animated.div>
      </Sidebar>
    </header>
  );
};

export default memo(HeaderMobile);
