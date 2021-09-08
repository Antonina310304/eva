import React, { FC, HTMLAttributes, memo } from 'react';

import { SiteNavigationData } from '@Types/SiteNavigationData';
import Link from '@UI/Link';
import Boldik from '@UI/Boldik';
import styles from './FooterNav.module.css';

export interface FooterNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  linkList: SiteNavigationData[];
}

const FooterNav: FC<FooterNavProps> = ({ linkList }) => {
  return (
    <ul className={styles.footerNav}>
      {linkList.map((item) => {
        return (
          <li key={item.title} className={styles.footerNavItem}>
            {item.url ? (
              <Link className={styles.footerNavLink} to={item.url}>
                <Boldik>{item.title}</Boldik>
              </Link>
            ) : (
              <span className={styles.footerNavLink}>{item.title}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(FooterNav);
