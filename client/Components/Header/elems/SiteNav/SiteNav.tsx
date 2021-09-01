import React, { FC, HTMLAttributes, memo } from 'react';
import Link from '@UI/Link';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import siteNavList from './data';

import styles from './SiteNav.module.css';

export interface SiteNavProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SiteNav: FC<SiteNavProp> = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.siteNav}>
        {siteNavList.map((item) => {
          return (
            <li key={item.title}>
              <Link
                className={cn(styles.link, {
                  [styles.active]: location.pathname.indexOf(item.link) !== -1,
                })}
                view='navigation'
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

export default memo(SiteNav);
