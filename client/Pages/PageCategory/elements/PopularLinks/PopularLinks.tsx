import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import { PopularLinkData } from '@Types/Category';
import styles from './PopularLinks.module.css';

export interface PopularLinksProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label?: string;
  popularLinks: PopularLinkData[];
}

const PopularLinks: FC<PopularLinksProps> = (props) => {
  const { className, label, popularLinks, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.popularLinks, className)}>
      {label && <span className={styles.label}>{label}</span>}
      {popularLinks.map((popularLink) => (
        <Link key={popularLink.name} className={styles.link} href={popularLink.link}>
          {popularLink.name}
        </Link>
      ))}
    </div>
  );
};

export default memo(PopularLinks);
