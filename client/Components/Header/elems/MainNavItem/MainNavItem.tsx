import React, { FC, HTMLAttributes, memo, useEffect, useState } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Boldik from '@UI/Boldik';
import DropDownWrapper from '@Components/Header/elems/DropDownWrapper';
import CategoryList from '@Components/Header/elems/CategoryList';
import BannerMenu from '@Components/Header/elems/BannerMenu';
import { IMainNav } from '@Types/MainNav';
import styles from './MainNavItem.module.css';

export interface MainNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  mainNavItem: IMainNav;
  isFirstClick: boolean;
  hideOnScroll: boolean;
  setIsFirstClick: (arg: boolean) => void;
}

const MainNavItem: FC<MainNavProps> = ({
  mainNavItem,
  hideOnScroll,
  isFirstClick,
  setIsFirstClick,
}) => {
  const [isShowSubmenu, setIsShowSubmenu] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(false);

  function onHover(isDropDown) {
    setIsShowSubmenu(true);
    if (!isFirstClick) {
      setIsFirstClick(true);
      setIsFirst(true);
    }
    if (!isDropDown) {
      setIsFirstClick(false);
    }
  }

  function onBlur() {
    setIsShowSubmenu(false);
    setIsFirst(false);
  }

  useEffect(() => {
    if (hideOnScroll) {
      onBlur();
    }
  }, [hideOnScroll]);

  return (
    <div
      className={cn(styles.item)}
      onMouseOver={() => onHover(!!mainNavItem.dropDown)}
      onMouseLeave={onBlur}
    >
      {mainNavItem.dropDown ? (
        <>
          <Boldik className={styles.title}>{mainNavItem.title}</Boldik>
          <DropDownWrapper isFirst={isFirst} isShow={isShowSubmenu}>
            <div className={styles.flex}>
              <div className={styles.wrapperList}>
                {mainNavItem.dropDown.map((i) => (
                  <div key={i.name} className={styles.wrapper}>
                    <p className={styles.subtitle}>{i.name}</p>
                    <div className={styles.categoryList}>
                      <CategoryList category={i} />
                    </div>
                    <Link className={styles.linkAll} to={i.link} view='secondary'>
                      {i.textLink}
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                {mainNavItem.withBanner && (
                  <div className={styles.banner}>
                    <BannerMenu banner={mainNavItem.banner} />
                  </div>
                )}
              </div>
            </div>
          </DropDownWrapper>
        </>
      ) : (
        <Link to={mainNavItem.link} className={styles.title}>
          <Boldik>{mainNavItem.title}</Boldik>
        </Link>
      )}
    </div>
  );
};

export default memo(MainNavItem);
