import React, { FC, HTMLAttributes, memo, useState } from 'react';

import SiteNav from '@Components/Header/elems/SiteNav/SiteNav';
import MainNav from '@Components/Header/elems/MainNav/MainNav';
import Search from '@Components/Header/elems/Search';
import Location from '@Components/Header/elems/Location';
import Phone from '@Components/Header/elems/Phone';
import UserMenu from '@Components/UserMenu';
import Container from '@Components/Container';
import { UserMenuDesktop } from '@Components/Header/data';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cn from 'classnames';
import Flex from '@Components/Flex';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import Overlay from '@Components/Overlay';
import styles from './HeaderDesktop.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderDesktop: FC<HeaderProps> = () => {
  const [hideOnScroll, setHideOnScroll] = useState<boolean>(false);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y < -2) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
        setIsFirstClick(false);
      }
    },
    [hideOnScroll],
  );

  return (
    <header
      className={cn(styles.header, {
        [styles.scroll]: hideOnScroll,
      })}
    >
      <div className={styles.in}>
        <div className={styles.headerTop}>
          <Container>
            <Flex className={styles.headerIn}>
              <Flex ai='center' jc='flex-start' className={styles.maxWidth}>
                <HeaderLogo className={styles.slider} />
                <Search className={styles.search} />
                <SiteNav
                  isFirstClick={isFirstClick}
                  setIsFirstClick={setIsFirstClick}
                  className={styles.mainNav}
                  hideOnScroll={hideOnScroll}
                />
              </Flex>

              <Flex ai='center'>
                <Location className={styles.location} location='????????????' />
                <Phone />
                {hideOnScroll && (
                  <UserMenu className={styles.userMenu} userMenuList={UserMenuDesktop} />
                )}
              </Flex>
            </Flex>
          </Container>
        </div>
      </div>
      <Overlay isOpen={isFirstClick} />
    </header>
  );
};

export default memo(HeaderDesktop);
