import React, { FC, HTMLAttributes } from 'react';
import { mainNavList } from '@Components/Header/data';

import CategoryMobile from '@Components/Header/elems/CategoryMobile';
import styles from './MainNavMobile.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hideSideBar: () => void;
  setIsShowSubMenu: (arg: boolean) => void;
  isShowSubMenuContent: boolean;
}

const MainNavMobile: FC<MainNavListProps> = ({
  setIsShowSubMenu,
  hideSideBar,
  isShowSubMenuContent,
}) => {
  return (
    <div className={styles.wrapper}>
      {mainNavList.map((item) => {
        return (
          <CategoryMobile
            key={item.title}
            category={item}
            hideSideBar={hideSideBar}
            setIsShowSubMenu={setIsShowSubMenu}
            isShowSubMenuContent={isShowSubMenuContent}
          />
        );
      })}
    </div>
  );
};

export default MainNavMobile;
