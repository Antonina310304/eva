import React, { FC, HTMLAttributes } from 'react';
import { IMainNavSubmenu } from '@Types/MainNav';

export interface DropDownMenuMobileProps extends HTMLAttributes<HTMLDivElement> {
  dropDownMenuList: IMainNavSubmenu[];
}

const DropDownMenuMobile: FC<DropDownMenuMobileProps> = ({ dropDownMenuList }) => {
  return (
    <div>
      <ul>
        {dropDownMenuList.map((item) => {
          return (
            <li key={item.name}>
              <a>item.link</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDownMenuMobile;
