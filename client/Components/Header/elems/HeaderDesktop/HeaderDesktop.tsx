import React, { FC, memo, HTMLAttributes } from 'react';

import SiteNav from '@Components/Header/elems/SiteNav/SiteNav';
import MainNav from '@Components/Header/elems/MainNav/MainNav';
import Slider from '@Components/Header/elems/Slider';
import Search from '@Components/Header/elems/Search';
import Location from '@Components/Header/elems/Location';
import Phone from '@Components/Header/elems/Phone';
import UserMenu from '@Components/Header/elems/UserMenu';
import Container from '@Components/Container';
import styles from './HeaderDesktop.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderDesktop: FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTopWrap}>
        <Container>
          <div className={styles.headerTop}>
            <div className={styles.flex}>
              <Slider />
              <Search />
              <SiteNav />
            </div>

            <div className={styles.flex}>
              <Location />
              <Phone />
            </div>
          </div>
        </Container>
      </div>
      <div>
        <Container>
          <div className={styles.flex}>
            <MainNav />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default memo(HeaderDesktop);
