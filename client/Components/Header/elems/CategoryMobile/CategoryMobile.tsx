import React, { FC, HTMLAttributes, useState } from 'react';
import DropDownMobileWrapper from '@Components/Header/elems/DropDownMobileWrapper';
import { IMainNav } from '@Types/MainNav';

import Subcategory from '@Components/Header/elems/Subcategory';
import styles from './CategoryMobile.module.css';

export interface CategoryMobileProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: IMainNav;
  showSideBar: () => void;
  hideSideBar: () => void;
}

/*
 * список категорий 1 уровня
 * */
// TODO Удалить key index
const CategoryMobile: FC<CategoryMobileProps> = ({ category, showSideBar, hideSideBar }) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  function showDropDown() {
    // закрываю основное меню
    hideSideBar();

    // открываю Dropdown
    setIsOpenDropDown(true);
  }

  function hideDropDown() {
    setIsOpenDropDown(false);
  }

  function goBackSideBar() {
    // меню состояние выпадающего меню
    setIsOpenDropDown(false);

    // открываю sideBar
    showSideBar();
  }

  return (
    <div className={styles.inner}>
      <div className={styles.categoryWrapper} onClick={showDropDown}>
        <p
          style={{ backgroundImage: `url(react/static/img/category/${category.icon})` }}
          className={styles.icon}
        />
        <p className={styles.category}>{category.title}</p>
        <p className={styles.arrow} />
      </div>
      <DropDownMobileWrapper
        isOpen={isOpenDropDown}
        showSideBar={showSideBar}
        goBackSideBar={goBackSideBar}
        hideDropDown={hideDropDown}
      >
        <Subcategory category={category} />
      </DropDownMobileWrapper>
    </div>
  );
};

export default CategoryMobile;
