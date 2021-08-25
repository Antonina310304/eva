import React, { FC, HTMLAttributes, ReactElement, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';
import styles from './SideBar.module.css';

export interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactElement;
  hideSideBar: () => void;
  isOpenSideBar: boolean;
  backMainMenu: () => void;
}

/**
 * тут оставляем только функционал открытия и закрытия sidebar
 * */
const SideBar: FC<SideBarProps> = ({ backMainMenu, hideSideBar, isOpenSideBar, children }) => {
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
          backMainMenu();
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenSideBar, api]);

  return (
    <animated.div style={{ left }} className={styles.sideBar}>
      {children}
    </animated.div>
  );
};

export default SideBar;
