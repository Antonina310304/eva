import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import DropDownMobileWrapper from '@Components/Header/elems/DropDownMobileWrapper';
import { IMainNav } from '@Types/MainNav';

import Subcategory from '@Components/Header/elems/Subcategory';
import styles from './CategoryMobile.module.css';

export interface CategoryMobileProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: IMainNav;
  hideSideBar: () => void;
  isShowSubMenuContent: boolean;
  setIsShowSubMenu: (arg: boolean) => void;
}

const CategoryMobile: FC<CategoryMobileProps> = ({
  category,
  hideSideBar,
  setIsShowSubMenu,
  isShowSubMenuContent,
}) => {
  // по умолчанию подменю закрыто, иначе все будут сразу открыты
  const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);

  function showDropDown() {
    // открывается подменю
    setIsShowSubMenu(true);

    // меняется z-index у актуального пункта меню
    setIsOpenDropDown(true);
  }

  useEffect(() => {
    if (!isShowSubMenuContent) {
      setIsOpenDropDown(false);
    }
  }, [isShowSubMenuContent]);

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
        isOpenDropDown={isOpenDropDown}
        hideSideBar={hideSideBar}
        setIsShowSubMenu={setIsShowSubMenu}
      >
        <Subcategory category={category} />
      </DropDownMobileWrapper>
    </div>
  );
};

export default CategoryMobile;
