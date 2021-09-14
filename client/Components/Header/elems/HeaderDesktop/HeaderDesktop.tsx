import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import SiteNav from '@Components/Header/elems/SiteNav/SiteNav';
import Search from '@Components/Header/elems/Search';
import Phone from '@Components/Header/elems/Phone';
import UserMenu from '@Components/UserMenu';
import { UserMenuDesktop } from '@Components/Header/data';
import HeaderLogo from '@Components/Header/elems/HeaderLogo';
import Overlay from '@Components/Overlay';
import Link from '@UI/Link';
import useScrollPosition from '@Hooks/useScrollPosition';
import useModals from '@Hooks/useModals';
import useMeta from '@Queries/useMeta';
import styles from './HeaderDesktop.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderDesktop: FC<HeaderProps> = () => {
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [isFirstClick, setIsFirstClick] = useState(false);
  const [, { openModal }] = useModals();
  const meta = useMeta();

  const handleClickLocation = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);

  useScrollPosition(({ current }) => {
    if (current.y > 2) {
      setHideOnScroll(true);
    } else {
      setHideOnScroll(false);
      setIsFirstClick(false);
    }
  });

  if (!meta.isSuccess) return null;

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
                <Link
                  preventDefault
                  className={styles.location}
                  to='#'
                  view='secondary'
                  onClick={handleClickLocation}
                >
                  {meta.data.region.name}
                </Link>
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
