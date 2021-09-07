import React, { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbsItemProps {
  link: string;
  text: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  breadcrumbs: BreadcrumbsItemProps[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { className, breadcrumbs, ...restProps } = props;

  return (
    <nav
      {...restProps}
      className={cn(styles.breadcrumbs, className)}
      itemScope
      itemType='http://schema.org/BreadcrumbList'
    >
      {breadcrumbs.map((item, index) => {
        const isNotLast = index !== breadcrumbs.length - 1;

        return (
          <div
            className={styles.item}
            key={index}
            itemProp='itemListElement'
            itemScope
            itemType='http://schema.org/ListItem'
          >
            {isNotLast ? (
              <Link view='secondary' className={styles.link} to={item.link}>
                {item.text}
              </Link>
            ) : (
              <span className={styles.last}>{item.text}</span>
            )}
            {isNotLast && <div className={styles.separator}>/</div>}
            <meta itemProp='position' content={(index + 1).toString()} />
            {isNotLast && <link itemProp='item' href={item.link} />}
          </div>
        );
      })}
    </nav>
  );
};

export default memo(Breadcrumbs);
