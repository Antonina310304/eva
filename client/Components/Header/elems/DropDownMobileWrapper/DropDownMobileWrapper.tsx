import React, { FC, HTMLAttributes, ReactChild, useEffect, useState } from 'react';

import cn from 'classnames';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import styles from './DropDownMobileWrapper.module.css';

/**
 * возврат к главному меню
 * и закрыть SideBar
 * */

export interface DropDownMobileWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isOpenDropDown: boolean;
  isShowSubMenu: boolean;
  backMainMenu: () => void;
  hideSideBar: () => void;
  setIsOpenDropDown: (arg: boolean) => void;
  children: ReactChild;
}
const DropDownMobileWrapper: FC<DropDownMobileWrapperProps> = ({
  isOpenDropDown,
  isShowSubMenu,
  backMainMenu,
  hideSideBar,
  setIsOpenDropDown,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDropDown);

  function back() {
    setIsOpenDropDown(false);
    backMainMenu();
  }

  function close() {
    setIsOpenDropDown(false);
    hideSideBar();
  }

  useEffect(() => {
    if (isOpenDropDown) {
      setIsOpen(isOpenDropDown);
    }
  }, [isOpenDropDown]);

  useEffect(() => {
    if (!isShowSubMenu) {
      setIsOpen(false);
    }
  }, [isShowSubMenu]);

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
            onClick={close}
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
