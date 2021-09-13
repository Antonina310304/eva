import React, { memo, useCallback, useState } from 'react';
import cn from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import Burger from '@Components/Header/elems/Burger';
import Search from '@Components/Header/elems/Search';
import Sidebar from '@Components/Header/elems/SideBar';
import UserMenu from '@Components/UserMenu';
import Overlay from '@Components/Overlay';
import { UserMenuMobile } from '@Components/Header/data';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import useMediaQuery from '@Hooks/useMediaQuery';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
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

  const showSideBar = useCallback(() => {
    setIsOpenSideBar(true);
    document.querySelector('body').style.overflow = 'hidden';
  }, []);

  const hideSideBar = useCallback(() => {
    setIsOpenSideBar(false);
  }, []);

  return (
    <header
      className={cn(styles.header, {
        [styles.show]: hide === 'top',
        [styles.hide]: hide === 'bottom',
      })}
    >
      <div className={styles.wrapper}>
        <Overlay isOpen={isOpenSideBar} onClick={hideSideBar} />
        <Burger onClick={showSideBar} className={styles.burger} />
        <div className={styles.in}>
          <div className={styles.sliderWrapper}>
            <HeaderLogo />
          </div>

          <div className={styles.flexWrapper}>
            <div className={styles.search}>
              <Search className={styles.search} />
            </div>
            {!isMobile && <UserMenu className={styles.userMenu} userMenuList={UserMenuMobile} />}
          </div>
        </div>
      </div>
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
