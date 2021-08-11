import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import styles from './Navigation.module.css';

export interface NavigationItem {
  name: string;
  href: string;
  active?: boolean;
}

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  navigation: NavigationItem[];
}

const Navigation: FC<NavigationProps> = (props) => {
  const { className, navigation, ...restProps } = props;

  return (
    <nav {...restProps} className={cn(styles.navigation, className)}>
      {navigation.map((item, index: number) => (
        <div className={styles.navigationItem} key={index}>
          <Link
            to={item.href}
            className={cn(styles.navigationLink, { [styles.active]: item.active })}
            view='simple'
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default memo(Navigation);
