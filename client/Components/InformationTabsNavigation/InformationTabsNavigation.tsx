import React, { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Gallery from '@UI/Gallery';
import { NavigationItem } from '@Pages/PageWarranty/typings';
import styles from './InformationTabsNavigation.module.css';

export interface InformationTabsNavigationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  navigation: NavigationItem[];
}

const InformationTabsNavigation: FC<InformationTabsNavigationProps> = (props) => {
  const { className, navigation, ...restProps } = props;

  const slideIndex = useMemo(() => {
    return navigation.findIndex((item) => item.active);
  }, [navigation]);

  return (
    <nav {...restProps} className={cn(styles.navigation, className)}>
      <div className={styles.galleryWrapper}>
        <Gallery className={styles.gallery} slideIndex={slideIndex} centered>
          {navigation.map((item, index: number) => (
            <div className={styles.navigationItem} key={index}>
              <Link
                to={item.href}
                className={cn(styles.navigationLink, { [styles.active]: item.active })}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </Gallery>
      </div>
    </nav>
  );
};

export default memo(InformationTabsNavigation);
