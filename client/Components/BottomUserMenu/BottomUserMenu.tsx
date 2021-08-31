import React, { FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import BottomMenuData from '@Components/BottomUserMenu/data';
import UserElemMenu from '@UI/UserElemMenu';
import styles from './BottomUserMenu.module.css';

export interface BottomMenuProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BottomUserMenu: FC<BottomMenuProps> = ({ className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.fixed}>
        <ul className={styles.list}>
          {BottomMenuData.map((item) => (
            <li key={item.link}>
              <UserElemMenu element={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BottomUserMenu;
