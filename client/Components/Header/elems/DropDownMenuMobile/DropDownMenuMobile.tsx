// TODO  тут будет изображение, ссылка, текст и списки

import React, { FC, HTMLAttributes } from 'react';

export interface DropDownMenuMobileProps extends HTMLAttributes<HTMLDivElement> {
  dropDownMenuList: any[];
}

const DropDownMenuMobile: FC<DropDownMenuMobileProps> = ({ dropDownMenuList }) => {
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

export default DropDownMenuMobile;
