import { FC, HTMLAttributes, useState } from 'react';
import * as React from 'react';
import cn from 'classnames';

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
  onClose?: () => void;
}

const SideBar: FC<SideBarProps> = (props) => {
  const { isShowSubMenuContent, isShowSubMenu, setIsShowSubMenu, isOpenSideBar, onClose } = props;
  const [activeMenu, setActiveMenu] = useState('catalog');

  return (
    <div className={cn(styles.sideBar, { [styles.opened]: isOpenSideBar })}>
      <AnimatedWrapper isShowSubMenu={isShowSubMenu}>
        {(ref: React.LegacyRef<HTMLDivElement>) => (
          <div className={styles.inWrap}>
            <div ref={ref} className={styles.inWrap}>
              <MobileNavContainer className={styles.header}>
                <div className={styles.wrapperSearch}>
                  <Search isMenu className={styles.search} />
                  <button className={styles.close} type='button' onClick={onClose} />
                </div>
              </MobileNavContainer>

              <SiteNavMobile activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

              <MainNavMobile
                activeMenu={activeMenu}
                hideSideBar={onClose}
                setIsShowSubMenu={setIsShowSubMenu}
                isShowSubMenuContent={isShowSubMenuContent}
              />
              <UserBottomMenuMobile />
            </div>
          </div>
        )}
      </AnimatedWrapper>
    </div>
  );
};

export default SideBar;
