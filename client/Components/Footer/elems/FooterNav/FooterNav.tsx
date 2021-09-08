import React, { FC, HTMLAttributes, memo, MouseEvent } from 'react';

import { SiteNavigationData } from '@Types/SiteNavigationData';
import Link from '@UI/Link';
import styles from './FooterNav.module.css';

export interface FooterNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  linkList: SiteNavigationData[];
  isExternalLink?: boolean;
  isRedirectToDevice?: boolean;
}

const FooterNav: FC<FooterNavProps> = ({ linkList }) => {
  function onClick(event: MouseEvent) {
    const link = event.currentTarget.getAttribute('href');
    const isBrowser = typeof window === 'object';
    if (!isBrowser) return;
    window.location.href = link;
  }

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
        if (item.isRedirectToDevice) {
          return (
            <li key={item.title} data-test='test' className={styles.footerNavItem}>
              <Link onClick={onClick} className={styles.footerNavLink} to={item.url} view='simple'>
                {item.title}
              </Link>
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
