import React, { FC, HTMLAttributes, memo, useState } from 'react';
import cn from 'classnames';

import SiteNav from '@Components/Header/elems/SiteNav/SiteNav';
import Search from '@Components/Header/elems/Search';
import Location from '@Components/Header/elems/Location';
import Phone from '@Components/Header/elems/Phone';
import UserMenu from '@Components/UserMenu';
import { UserMenuDesktop } from '@Components/Header/data';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import Overlay from '@Components/Overlay';
import useScrollPosition from '@Hooks/useScrollPosition';
import styles from './HeaderDesktop.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderDesktop: FC<HeaderProps> = () => {
  const [hideOnScroll, setHideOnScroll] = useState<boolean>(false);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);

  useScrollPosition(({ current }) => {
    if (current.y > 2) {
      setHideOnScroll(true);
    } else {
      setHideOnScroll(false);
      setIsFirstClick(false);
    }
  });

  return (
    <header
      className={cn(styles.header, {
        [styles.scroll]: hideOnScroll,
      })}
    >
      <div className={styles.in}>
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <div className={styles.headerIn}>
              <div className={styles.maxWidth}>
                <HeaderLogo className={styles.slider} />
                <Search className={styles.search} />
                <SiteNav
                  isFirstClick={isFirstClick}
                  setIsFirstClick={setIsFirstClick}
                  className={styles.mainNav}
                  hideOnScroll={hideOnScroll}
                />
              </div>

              <div className={styles.right}>
                <Location className={styles.location} location='Москва' />
                <Phone />
                {hideOnScroll && (
                  <UserMenu className={styles.userMenu} userMenuList={UserMenuDesktop} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Overlay isOpen={isFirstClick} />
    </header>
  );
};

export default memo(HeaderDesktop);
