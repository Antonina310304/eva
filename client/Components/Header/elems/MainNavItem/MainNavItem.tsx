import React, { FC, HTMLAttributes, memo, useEffect, useState } from 'react';

import CategoryList from '@Components/Header/elems/CategoryList';

import { IMainNav } from '@Types/MainNav';
import DropDownWrapper from '@Components/Header/elems/DropDownWrapper';

import Link from '@UI/Link';
import BannerMenu from '@Components/Header/elems/BannerMenu';
import cn from 'classnames';
import styles from './MainNavItem.module.css';

export interface MainNavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  mainNavItem: IMainNav;
  isFirstClick: boolean;
  hideOnScroll: boolean;
  setIsFirstClick: (arg: boolean) => void;
}

// TODO сделать навигацию каталога
// TODO Удалить key index
const MainNavItem: FC<MainNavProps> = ({
  mainNavItem,
  hideOnScroll,
  isFirstClick,
  setIsFirstClick,
}) => {
  const [isShowSubmenu, setIsShowSubmenu] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(false);

  function onHover() {
    setIsShowSubmenu(true);
    if (!isFirstClick) {
      setIsFirstClick(true);
      setIsFirst(true);
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
    <div className={cn(styles.item)} onMouseOver={onHover} onMouseLeave={onBlur}>
      <p className={styles.title}>{mainNavItem.title}</p>
      <DropDownWrapper isFirst={isFirst} isShow={isShowSubmenu}>
        <div className={styles.flex}>
          <div className={styles.wrapperList}>
            {mainNavItem.dropDown.map((i, index) => (
              <div key={index} className={styles.wrapper}>
                <p className={styles.subtitle}>{i.name}</p>
                <div className={styles.categoryList}>
                  <CategoryList category={i} />
                </div>
                <Link view='grayString' to={i.link}>
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
    </div>
  );
};

export default memo(MainNavItem);