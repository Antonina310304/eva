import React, { FC, HTMLAttributes, memo } from 'react';
import { mainNavList } from '@Components/Header/data';

import cn from 'classnames';

import MainNavItem from '@Components/Header/elems/MainNavItem';
import styles from './MainNav.module.css';

export interface MainNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isFirstClick: boolean;
  hideOnScroll: boolean;
  setIsFirstClick: (arg: boolean) => void;
}

// TODO сделать навигацию каталога
// TODO Удалить key index
const MainNav: FC<MainNavProps> = ({ hideOnScroll, isFirstClick, setIsFirstClick, className }) => {
  return (
    <div className={className}>
      <div onMouseLeave={() => setIsFirstClick(false)} className={cn(styles.wrap, styles.mainNav)}>
        {mainNavList.map((item, ind) => {
          return (
            <MainNavItem
              key={ind}
              mainNavItem={item}
              hideOnScroll={hideOnScroll}
              isFirstClick={isFirstClick}
              setIsFirstClick={setIsFirstClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(MainNav);
