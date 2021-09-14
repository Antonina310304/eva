import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { siteNavList } from '@Components/Header/data';
import CategoryMobile from '../CategoryMobile';
import styles from './MainNavMobile.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  hideSideBar: () => void;
  setIsShowSubMenu: (arg: boolean) => void;
  isShowSubMenuContent: boolean;
  activeMenu: string;
}

const MainNavMobile: FC<MainNavListProps> = ({
  setIsShowSubMenu,
  hideSideBar,
  isShowSubMenuContent,
  activeMenu,
}) => {
  return (
    <div className={styles.wrapper}>
      {siteNavList.map((menu) => {
        return (
          <div key={menu.link} className={cn({ [styles.submenu]: activeMenu !== menu.link })}>
            {menu.submenu.map((item) => (
              <CategoryMobile
                key={item.title}
                category={item}
                hideSideBar={hideSideBar}
                setIsShowSubMenu={setIsShowSubMenu}
                isShowSubMenuContent={isShowSubMenuContent}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default memo(MainNavMobile);
