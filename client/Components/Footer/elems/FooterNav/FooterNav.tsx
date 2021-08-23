import React, { FC, HTMLAttributes, memo } from 'react';
import { SiteNavigationData } from '@Types/SiteNavigationData';
import Link from '@UI/Link';

import styles from './FooterNav.module.css';

export interface FooterNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  linkList: SiteNavigationData[];
  isExternalLink?: boolean;
}

const FooterNav: FC<FooterNavProps> = ({ linkList }) => {
  return (
    <ul className={styles.footerNav}>
      {linkList.map((item) => {
        if (!item.url) {
          return (
            <li key={item.title} className={styles.footerNavItem}>
              <span className={styles.footerNavLink}>{item.title}</span>
            </li>
          );
        }
        return (
          <li key={item.url} className={styles.footerNavItem}>
            {item.isExternalLink ? (
              <Link target='_blank' className={styles.footerNavLink} to={item.url} view='simple'>
                {item.title}
              </Link>
            ) : (
              <Link className={styles.footerNavLink} to={item.url} view='simple'>
                {item.title}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(FooterNav);
