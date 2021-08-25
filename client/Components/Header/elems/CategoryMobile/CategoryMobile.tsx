import React, { FC, HTMLAttributes, useState } from 'react';
import DropDownMobileWrapper from '@Components/Header/elems/DropDownMobileWrapper';
import { IMainNav } from '@Types/MainNav';

import Subcategory from '@Components/Header/elems/Subcategory';
import styles from './CategoryMobile.module.css';

export interface CategoryMobileProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: IMainNav;
  isOpenSideBar: boolean;
  showSideBar: () => void;
  hideSideBar: () => void;
  backMainMenu: () => void;
  showDropDown: () => void;
  isShowSubMenu: boolean;
  setIsShowSubMenu: (arg: boolean) => void;
}

/*
 * список категорий 1 уровня
 * */
// TODO Удалить key index
const CategoryMobile: FC<CategoryMobileProps> = ({
  category,
  showDropDown,
  hideSideBar,
  backMainMenu,
  isOpenSideBar,
  isShowSubMenu,
  setIsShowSubMenu,
}) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  function show() {
    showDropDown();

    // подменю открыто
    setIsShowSubMenu(true);

    // открываю Dropdown
    setIsOpenDropDown(true);
  }

  return (
    <div className={styles.inner}>
      <div className={styles.categoryWrapper} onClick={show}>
        <p
          style={{ backgroundImage: `url(react/static/img/category/${category.icon})` }}
          className={styles.icon}
        />
        <p className={styles.category}>{category.title}</p>
        <p className={styles.arrow} />
      </div>
      <DropDownMobileWrapper
        isOpenDropDown={isOpenDropDown}
        backMainMenu={backMainMenu}
        hideSideBar={hideSideBar}
        setIsOpenDropDown={setIsOpenDropDown}
        isOpenSideBar={isOpenSideBar}
        isShowSubMenu={isShowSubMenu}
      >
        <Subcategory category={category} />
      </DropDownMobileWrapper>
    </div>
  );
};

export default CategoryMobile;
