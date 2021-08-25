import React, { FC, HTMLAttributes } from 'react';
import { mainNavList } from '@Components/Header/data';

import CategoryMobile from '@Components/Header/elems/CategoryMobile';
import styles from './MainNavMobile.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  showSideBar: () => void;
  hideSideBar: () => void;
  showDropDown: () => void;
  backMainMenu: () => void;
  isOpenSideBar: boolean;
  isShowSubMenu: boolean;
  setIsShowSubMenu: (arg: boolean) => void;
}

/**
 * прокидываю закрытие hideSideBar и showSideBar в MainNavMobileItem
 * */
const MainNavMobile: FC<MainNavListProps> = ({
  backMainMenu,
  showDropDown,
  isShowSubMenu,
  setIsShowSubMenu,
  showSideBar,
  hideSideBar,
  isOpenSideBar,
}) => {
  return (
    <div className={styles.wrapper}>
      {mainNavList.map((item) => {
        return (
          <CategoryMobile
            key={item.title}
            category={item}
            showSideBar={showSideBar}
            showDropDown={showDropDown}
            hideSideBar={hideSideBar}
            backMainMenu={backMainMenu}
            isOpenSideBar={isOpenSideBar}
            isShowSubMenu={isShowSubMenu}
            setIsShowSubMenu={setIsShowSubMenu}
          />
        );
      })}
    </div>
  );
};

export default MainNavMobile;
