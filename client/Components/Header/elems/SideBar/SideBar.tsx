import React, { FC, HTMLAttributes, ReactElement, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';
import styles from './SideBar.module.css';

export interface SideBarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactElement;
  hideSideBar: () => void;
  isOpenSideBar: boolean;
}

/**
 * тут оставляем только функционал открытия и закрытия sidebar
 * */
const SideBar: FC<SideBarProps> = ({ hideSideBar, isOpenSideBar, children }) => {
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
      });
    }
  }, [isOpenSideBar, api]);

  return (
    <animated.div style={{ left }} className={styles.sideBar}>
      <button className={styles.close} onClick={hideSideBar} type='button'>
        закрыть
      </button>
      {children}
    </animated.div>
  );
};

export default SideBar;
