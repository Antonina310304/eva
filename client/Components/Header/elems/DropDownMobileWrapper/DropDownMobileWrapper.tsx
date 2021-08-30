import React, { FC, HTMLAttributes, ReactChild, useEffect, useState } from 'react';

import cn from 'classnames';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import styles from './DropDownMobileWrapper.module.css';

export interface DropDownMobileWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isOpenDropDown: boolean;
  hideSideBar: () => void;
  setIsShowSubMenu: (arg: boolean) => void;
  children: ReactChild;
}
const DropDownMobileWrapper: FC<DropDownMobileWrapperProps> = ({
  isOpenDropDown,
  setIsShowSubMenu,
  hideSideBar,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function back() {
    setIsShowSubMenu(false);
  }

  function hideSideMenu() {
    hideSideBar();
  }

  useEffect(() => {
    // нажали на пункт меню значение поменялось на true, меняем state
    setIsOpen(isOpenDropDown);
  }, [isOpenDropDown]);

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.open]: isOpen === true,
      })}
    >
      <MobileNavContainer className={styles.buttonWrap}>
        <>
          <button className={cn(styles.button, styles.buttonBack)} onClick={back} type='button'>
            <div className={cn(styles.icon, styles.back)} />
            назад
          </button>

          <button
            className={cn(styles.button, styles.icon, styles.close)}
            onClick={hideSideMenu}
            type='button'
          >
            закрыть
          </button>
        </>
      </MobileNavContainer>
      {children}
    </div>
  );
};

export default DropDownMobileWrapper;
