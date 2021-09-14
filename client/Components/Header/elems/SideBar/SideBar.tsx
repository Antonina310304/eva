import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

import AnimatedWrapper from '../AnimatedWrapper';
import MobileNavContainer from '../MobileNavContainer';
import Search from '../Search';
import SiteNavMobile from '../SiteNavMobile';
import MainNavMobile from '../MainNavMobile';
import UserBottomMenuMobile from '../UserBottomMenuMobile';
import styles from './SideBar.module.css';

export interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isOpenSideBar: boolean;
  setIsShowSubMenu: (arg: boolean) => void;
  setIsShowSubMenuContent: (arg: boolean) => void;
  isShowSubMenuContent: boolean;
  isShowSubMenu: boolean;
  hideSideBar: () => void;
}

const SideBar: FC<SideBarProps> = ({
  isShowSubMenuContent,
  isShowSubMenu,
  setIsShowSubMenu,
  isOpenSideBar,
  hideSideBar,
  setIsShowSubMenuContent,
}) => {
  const [activeMenu, setActiveMenu] = useState('catalog');

  const [{ left }, api] = useSpring(() => ({
    from: { left: `-100%` },
    config: { duration: 300 },
  }));

  useEffect(() => {
    if (isOpenSideBar) {
      api.start({
        reset: true,
        left: '0%',
      });
    } else {
      api.start({
        left: '-100%',
        onRest: () => {
          setIsShowSubMenu(false);
        },
      });
    }
  }, [setIsShowSubMenu, isOpenSideBar, api]);

  return (
    <animated.div style={{ left }} className={styles.sideBar}>
      <AnimatedWrapper
        setIsShowSubMenu={setIsShowSubMenu}
        isShowSubMenu={isShowSubMenu}
        className={styles.inner}
        isShowSubMenuContent={isShowSubMenuContent}
        setIsShowSubMenuContent={setIsShowSubMenuContent}
      >
        {(ref: React.LegacyRef<HTMLDivElement>) => (
          <div className={styles.inWrap}>
            <div ref={ref} className={styles.inWrap}>
              <MobileNavContainer className={styles.header}>
                <div className={styles.wrapperSearch}>
                  <Search isMenu className={styles.search} />
                  <button className={styles.close} onClick={hideSideBar} type='button' />
                </div>
              </MobileNavContainer>
              <MobileNavContainer>
                <SiteNavMobile activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              </MobileNavContainer>
              <MainNavMobile
                activeMenu={activeMenu}
                hideSideBar={hideSideBar}
                setIsShowSubMenu={setIsShowSubMenu}
                isShowSubMenuContent={isShowSubMenuContent}
              />
              <UserBottomMenuMobile />
            </div>
          </div>
        )}
      </AnimatedWrapper>
    </animated.div>
  );
};

export default SideBar;
