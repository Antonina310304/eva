import React, { FC, HTMLAttributes } from 'react';
import { mainNavList } from '@Components/Header/data';

import CategoryMobile from '@Components/Header/elems/CategoryMobile';
import styles from './MainNavMobile.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  showSideBar: () => void;
  hideSideBar: () => void;
}

/**
 * прокидываю закрытие hideSideBar и showSideBar в MainNavMobileItem
 * */
const MainNavMobile: FC<MainNavListProps> = ({ showSideBar, hideSideBar }) => {
  return (
    <div className={styles.wrapper}>
      {mainNavList.map((item) => {
        return (
          <CategoryMobile
            key={item.title}
            category={item}
            showSideBar={showSideBar}
            hideSideBar={hideSideBar}
          />
        );
      })}
    </div>
  );
};

export default MainNavMobile;
