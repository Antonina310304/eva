import { FC, HTMLAttributes, memo } from 'react';

import { SiteNavigationData } from '@Types/SiteNavigationData';
import Link from '@UI/Link';
import Boldik from '@UI/Boldik';
import { FooterMenuItemData } from '@Types/Layout';
import styles from './FooterNav.module.css';

export interface FooterNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  linkList?: SiteNavigationData[];
  items?: FooterMenuItemData[];
}

const FooterNav: FC<FooterNavProps> = (props) => {
  const { linkList, items } = props;

  return (
    <ul className={styles.footerNav}>
      {/* TODO: удалить после полной замены фейковых данных на реальные */}
      {(linkList || []).map((item, index) => {
        return (
          <li key={index} className={styles.footerNavItem}>
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

      {(items || []).map((item, index) => {
        return (
          <li key={index} className={styles.footerNavItem}>
            {item.link ? (
              <Link className={styles.footerNavLink} to={item.link}>
                <Boldik>{item.text}</Boldik>
              </Link>
            ) : (
              <span className={styles.footerNavLink}>{item.text}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(FooterNav);
