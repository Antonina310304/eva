import React, { FC, HTMLAttributes, memo } from 'react';
import { IUserMenu } from '@Types/UserMenu';

import UserElemMenu from '@Components/Header/elems/UserElemMenu';
import styles from './UserMenu.module.css';

export interface UserMenuProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  userMenuList: IUserMenu[];
}

const UserMenu: FC<UserMenuProp> = ({ userMenuList }) => {
  return (
    <ul className={styles.list}>
      {userMenuList.map((item) => (
        <li key={item.link}>
          <UserElemMenu element={item} />
        </li>
      ))}
    </ul>
  );
};

export default memo(UserMenu);
