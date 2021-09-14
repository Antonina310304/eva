import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import Burger from '@Components/Header/elems/Burger';
import Search from '@Components/Header/elems/Search';
import Sidebar from '@Components/Header/elems/SideBar';
import UserMenu from '@Components/UserMenu';
import Overlay from '@Components/Overlay';
import { UserMenuMobile } from '@Components/Header/data';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import useMedias from '@Hooks/useMedias';
import useScrollPosition from '@Hooks/useScrollPosition';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  const { isMobile } = useMedias();
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

  const [visible, setVisible] = useState(true);
  const [fixed, setFixed] = useState(true);
  const [withShadow, setWithShadow] = useState(false);

  const handleClickBurger = useCallback(() => {
    setIsOpenSideBar(true);
  }, []);

  const hideSideBar = useCallback(() => {
    setIsOpenSideBar(false);
  }, []);

  // Ставим модификаторы для шапки во время скрола
  useScrollPosition(({ previous, current }) => {
    const isUp = previous.y > current.y;
    const newFixed = isUp ? fixed : current.y > 79;

    setVisible(isUp);
    setFixed(newFixed);
    setWithShadow(newFixed && current.y > 5);
  });

  // Блокируем скролл, когда меню открыто
  useEffect(() => {
    function cleanup() {
      document.documentElement.style.overflow = '';
    }

    if (!isOpenSideBar) return cleanup;

    document.documentElement.style.overflow = 'hidden';

    return cleanup;
  }, [isOpenSideBar]);

  return (
    <header
      className={cn(styles.header, {
        [styles.fixed]: fixed,
        [styles.visible]: visible,
        [styles.withShadow]: withShadow,
      })}
    >
      <div className={styles.wrapper}>
        <Overlay isOpen={isOpenSideBar} onClick={hideSideBar} />
        <Burger onClick={handleClickBurger} className={styles.burger} />
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
