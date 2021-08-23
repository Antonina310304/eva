import React, { FC, memo, HTMLAttributes } from 'react';
import { BreadcrumbData } from '@Types/Breadcrumbs';
import Link from '@UI/Link';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  breadcrumbs: BreadcrumbData[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  if (!breadcrumbs.length) return null;

  return (
    <ul className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => {
        if (index === breadcrumbs.length - 1) {
          return (
            <li className={styles.breadcrumbsWrap} key={item.link}>
              <span className={styles.breadcrumbsItem}>{item.text}</span>
            </li>
          );
        }
        return (
          <li className={styles.breadcrumbsWrap} key={item.link}>
            <Link className={styles.breadcrumbsItem} view='simple' to={item.link}>
              {item.text}
              <span> / </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(Breadcrumbs);
