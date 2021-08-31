import React, { FC, HTMLAttributes, memo } from 'react';
import { IUserMenu } from '@Types/UserMenu';

import UserElemMenu from '@UI/UserElemMenu';
import cn from 'classnames';
import styles from './UserMenu.module.css';

export interface UserMenuProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  userMenuList: IUserMenu[];
}

const UserMenu: FC<UserMenuProp> = ({ className, userMenuList }) => {
  return (
    <ul className={cn(styles.list, className)}>
      {userMenuList.map((item) => (
        <li key={item.link}>
          <UserElemMenu element={item} />
        </li>
      ))}
    </ul>
  );
};

export default memo(UserMenu);
