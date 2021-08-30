import React, { FC, HTMLAttributes, memo } from 'react';
import { IUserMenu } from '@Types/UserMenu';
import Link from '@UI/Link/Link';
import cn from 'classnames';
import styles from './UserElemMenu.module.css';

export interface UserElemMenuProp extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  element: IUserMenu;
}

const UserElemMenu: FC<UserElemMenuProp> = ({ className, element }) => {
  return (
    <>
      {element.isDisabled ? (
        <p
          className={cn(className, styles.link, {
            [styles.user]: element.icon === 'user',
            [styles.favorites]: element.icon === 'favorites',
            [styles.basket]: element.icon === 'basket',
            [styles.full]: element.isChecked === true,
            [styles.disabled]: element.isDisabled === true,
          })}
        >
          {element.title}
          {element.isChecked && <span>{element.count}</span>}
        </p>
      ) : (
        <Link
          to={element.link}
          view='simple'
          className={cn(className, styles.link, {
            [styles.user]: element.icon === 'user',
            [styles.favorites]: element.icon === 'favorites',
            [styles.basket]: element.icon === 'basket',
            [styles.full]: element.isChecked === true,
            [styles.disabled]: element.isDisabled === true,
          })}
        >
          <>
            {element.title}
            {element.isChecked && <span>{element.count}</span>}
          </>
        </Link>
      )}
    </>
  );
};

export default memo(UserElemMenu);
