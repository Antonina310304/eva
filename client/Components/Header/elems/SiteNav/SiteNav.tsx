import React, { FC, HTMLAttributes } from 'react';
import Link from '@UI/Link';
import siteNavList from './data';

import styles from './SiteNav.module.css';
// TODO навигация по сайту (каталог, контакты и тд)
const SiteNav = () => {
  return (
    <div>
      <ul className={styles.siteNav}>
        {siteNavList.map((item) => {
          return (
            <li key={item.title}>
              <Link className={styles.link} view='navigation' to={item.link}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiteNav;
