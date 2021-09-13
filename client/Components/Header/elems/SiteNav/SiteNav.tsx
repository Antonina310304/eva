import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import MainNav from '@Components/Header/elems/MainNav/MainNav';
import UserMenu from '@Components/UserMenu/UserMenu';
import { siteNavList, UserMenuDesktop } from '@Components/Header/data';
import styles from './SiteNav.module.css';

export interface SiteNavProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isFirstClick: boolean;
  hideOnScroll: boolean;
  setIsFirstClick: (arg: boolean) => void;
}

const SiteNav: FC<SiteNavProp> = ({ isFirstClick, hideOnScroll, setIsFirstClick }) => {
  const [activeElement, isActiveElement] = useState<string>('catalog');

  const onMouseOver = useCallback((element) => {
    isActiveElement(element);
  }, []);

  return (
    <nav>
      <ul
        className={cn(
          {
            [styles.separator]: hideOnScroll,
          },
          styles.siteNav,
        )}
      >
        {siteNavList.map((item) => {
          return (
            <li
              onMouseOver={() => item.submenu && onMouseOver(item.link)}
              className={cn(styles.siteNavItem, {
                [styles.active]: item.link === activeElement,
              })}
              key={item.title}
            >
              <Link className={styles.linkWrapper} to={item.link}>
                <span className={cn({ [styles.active]: item.link === activeElement }, styles.link)}>
                  {item.title}
                </span>
              </Link>
              {item.submenu && (
                <div
                  className={cn(styles.headerBottom, {
                    [styles.headerBottomFloat]: hideOnScroll,
                  })}
                >
                  <div className={styles.container}>
                    <div className={styles.wrapperMainNav}>
                      <MainNav
                        mainNavList={item.submenu}
                        isFirstClick={isFirstClick}
                        setIsFirstClick={setIsFirstClick}
                        className={styles.mainNav}
                        hideOnScroll={hideOnScroll}
                      />
                      {!hideOnScroll && <UserMenu userMenuList={UserMenuDesktop} />}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(SiteNav);
