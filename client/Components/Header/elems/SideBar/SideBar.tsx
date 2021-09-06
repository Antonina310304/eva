import React, { FC, HTMLAttributes, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';

import AnimatedWrapper from '@Components/Header/elems/AnimatedWrapper';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer/MobileNavContainer';
import Search from '@Components/Header/elems/Search';
import SiteNav from '@Components/Header/elems/SiteNav';
import MainNavMobile from '@Components/Header/elems/MainNavMobile';
import UserBottomMenuMobile from '@Components/Header/elems/UserBottomMenuMobile/UserBottomMenuMobile';
import Flex from '@Components/Flex';
import IconClose from '@UI/IconClose';
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

/**
 * тут оставляем только функционал открытия и закрытия sidebar
 * */
const SideBar: FC<SideBarProps> = ({
  isShowSubMenuContent,
  isShowSubMenu,
  setIsShowSubMenu,
  isOpenSideBar,
  hideSideBar,
  setIsShowSubMenuContent,
}) => {
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
          document.querySelector('body').style.overflow = '';
          setIsShowSubMenu(false);
          // вернуться в исходное состояние при закрытии всего sidebar
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
                <Flex ai='center' jc='space-between'>
                  <button className={styles.close} onClick={hideSideBar} type='button'>
                    <IconClose />
                  </button>
                </Flex>
              </MobileNavContainer>
              <MobileNavContainer>
                <SiteNav
                  hideSideBar={hideSideBar}
                  setIsShowSubMenu={setIsShowSubMenu}
                  isShowSubMenuContent={isShowSubMenuContent}
                />
              </MobileNavContainer>
              <MainNavMobile
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
