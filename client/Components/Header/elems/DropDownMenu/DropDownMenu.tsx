import React, { FC, HTMLAttributes } from 'react';

export interface DropDownMenuListProps extends HTMLAttributes<HTMLDivElement> {
  dropDownMenuList: any[];
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
