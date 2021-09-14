import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import UserMenu from '@Components/UserMenu';
import Overlay from '@Components/Overlay';
import useMedias from '@Hooks/useMedias';
import useScrollPosition from '@Hooks/useScrollPosition';
import HeaderLogo from '../HeaderLogo';
import Burger from '../Burger';
import Search from '../Search';
import Sidebar from '../SideBar';
import styles from './HeaderMobile.module.css';

const HeaderMobile = () => {
  const { isMobile } = useMedias();
  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(false);
  const [isShowSubMenu, setIsShowSubMenu] = useState<boolean>(false);
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
    <div
      className={cn(styles.header, {
        [styles.fixed]: fixed,
        [styles.visible]: visible,
        [styles.withShadow]: withShadow,
      })}
    >
      <div className={styles.wrapper}>
        <Overlay visible={isOpenSideBar} onClick={hideSideBar} />
        <Burger onClick={handleClickBurger} className={styles.burger} />
        <div className={styles.in}>
          <div className={styles.sliderWrapper}>
            <HeaderLogo />
          </div>

          <div className={styles.flexWrapper}>
            <div className={styles.search}>
              <Search className={styles.search} />
            </div>
            {!isMobile && <UserMenu className={styles.userMenu} />}
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
    </div>
  );
};

export default memo(HeaderMobile);
