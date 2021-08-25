import React, { FC, HTMLAttributes } from 'react';
import { IMainNavSubmenu } from '@Types/MainNav';

export interface DropDownMenuListProps extends HTMLAttributes<HTMLDivElement> {
  dropDownMenuList: IMainNavSubmenu[];
}

const DropDownMenu: FC<DropDownMenuListProps> = ({ dropDownMenuList }) => {
  return (
    <div>
      <ul>
        {dropDownMenuList.map((item) => {
          return (
            <li key={item.title}>
              <a>item.title</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownMenu;
