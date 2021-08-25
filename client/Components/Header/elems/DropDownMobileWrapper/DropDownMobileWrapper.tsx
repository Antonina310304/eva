import React, { FC, HTMLAttributes, ReactChild, useEffect } from 'react';

import { useSpring, animated } from 'react-spring';
import cn from 'classnames';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import styles from './DropDownMobileWrapper.module.css';

/**
 * возврат к главному меню
 * и закрыть SideBar
 * */

export interface DropDownMobileWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  hideDropDown: () => void;
  goBackSideBar: () => void;
  children: ReactChild;
}
const DropDownMobileWrapper: FC<DropDownMobileWrapperProps> = ({
  isOpen,
  hideDropDown,
  goBackSideBar,
  children,
}) => {
  const [{ left }, api] = useSpring(() => ({
    from: { left: `100%` },
    config: { duration: 300 },
  }));

  useEffect(() => {
    if (isOpen) {
      api.start({
        reset: true,
        left: '0%',
      });
    }
  }, [isOpen, api]);

  function goBack() {
    goBackSideBar();
    api.start({
      left: `100%`,
    });
  }

  function onClose() {
    api.start({
      left: `-100%`,
    });

    // меняю state в родительском компоненте
    hideDropDown();
  }

  return (
    <animated.div style={{ left }} className={styles.wrapper}>
      <MobileNavContainer className={styles.buttonWrap}>
        <>
          <button className={cn(styles.button, styles.buttonBack)} onClick={goBack} type='button'>
            <div className={cn(styles.icon, styles.back)} />
            назад
          </button>
          <button
            className={cn(styles.button, styles.icon, styles.close)}
            onClick={onClose}
            type='button'
          >
            закрыть
          </button>
        </>
      </MobileNavContainer>
      {children}
    </animated.div>
  );
};

export default DropDownMobileWrapper;
