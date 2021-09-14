import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import { siteNavList } from '@Components/Header/data';
import styles from './SiteNavMobile.module.css';

export interface SiteNavProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeMenu: string;
  setActiveMenu: (arg: string) => void;
}

const SiteNavMobile: FC<SiteNavProp> = ({ activeMenu, setActiveMenu }) => {
  return (
    <nav>
      <ul className={styles.siteNav}>
        {siteNavList.map((item) => {
          return (
            <li
              className={cn(styles.item, {
                [styles.active]: item.link === activeMenu,
              })}
              key={item.title}
            >
              <Link
                preventDefault
                onClick={() => setActiveMenu(item.link)}
                className={cn({ [styles.active]: item.link === activeMenu }, styles.link)}
                to={item.link}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default memo(SiteNavMobile);
