import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import Link from '@UI/Link';

import cn from 'classnames';

import { siteNavList } from '@Components/Header/data';
import styles from './SiteNavMobile.module.css';

export interface SiteNavProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  activeMenu: string;
  setActiveMenu: (arg: string) => void;
}

const SiteNavMobile: FC<SiteNavProp> = ({ activeMenu, setActiveMenu }) => {
  const [activeElement, isActiveElement] = useState<string>('catalog');

  const onMouseOver = useCallback((element) => {
    isActiveElement(element);
  }, []);

  return (
    <nav>
      <ul className={styles.siteNav}>
        {siteNavList.map((item) => {
          return (
            <li
              onClick={() => setActiveMenu(item.link)}
              className={cn(styles.item, {
                [styles.active]: item.link === activeElement,
              })}
              key={item.title}
            >
              <Link
                view='navigation'
                className={cn({ [styles.active]: activeMenu }, styles.link)}
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
