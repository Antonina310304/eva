import React, { memo, useState } from 'react';
import Burger from '@Components/Header/elems/Burger';
import Search from '@Components/Header/elems/Search';

import Sidebar from '@Components/Header/elems/SideBar';
import UserMenu from '@Components/Header/elems/UserMenu';

import Overlay from '@Components/Overlay';
import Container from '@Components/Container';
import { UserMenuMobile } from '@Components/Header/data';
import cn from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  /**
   * анимация открытия и закрытия меню 1 уровня
   */

  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);

  /**
   * анимация открытия и закрытия меню 2 уровня
   */
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);

  /**
   * меняет состояние активного меню после отработки анимации закрытия (используется в самом низком компоненте)
   */
  const [isShowSubMenuContent, setIsShowSubMenuContent] = useState<boolean>(false);

  // событие состояние подменю/чтобы
  const [hideOnScroll, setHideOnScroll] = useState(true);
  const [hide, setHide] = useState('default');

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow && currPos.y !== 0) {
        setHide('top');
      } else if (!isShow && currPos.y !== 0) {
        setHide('bottom');
      } else if (currPos.y === 0) {
        setHide('default');
      }

      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
  );

  function showSideBar() {
    setIsOpenSideBar(true);
    document.querySelector('body').style.overflow = 'hidden';
  }

  function hideSideBar() {
    setIsOpenSideBar(false);
  }

  return (
    <header
      className={cn(styles.header, {
        [styles.show]: hide === 'top',
        [styles.hide]: hide === 'bottom',
      })}
    >
      <Container className={styles.wrapper}>
        <Overlay isOpen={isOpenSideBar} onClick={hideSideBar} />
        <Burger onClick={showSideBar} className={styles.burger} />
        <div className={styles.wrapper}>
          <div className={styles.sliderWrapper}>
            <HeaderLogo />
          </div>
          <div className={styles.flexWrapper}>
            <div className={styles.dMobileMWrapper}>
              <Search />
              <UserMenu userMenuList={UserMenuMobile} />
            </div>
          </div>
        </div>
      </Container>
      <Sidebar
        isOpenSideBar={isOpenSideBar}
        setIsShowSubMenu={setIsShowSubMenu}
        isShowSubMenuContent={isShowSubMenuContent}
        isShowSubMenu={isShowSubMenu}
        setIsShowSubMenuContent={setIsShowSubMenuContent}
        hideSideBar={hideSideBar}
      />
    </header>
  );
};

export default memo(HeaderMobile);
