import React, { FC, HTMLAttributes } from 'react';
import { SiteNavListProps } from '@Components/Header/elems/SiteNav/SiteNav';

import styles from './MainNav.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  mainNavList: any[];
}

const MainNav: FC<MainNavListProps> = ({ mainNavList }) => {
  return (
    <div>
      <ul>
        {mainNavList.map((item) => {
          return (
            <li key={item.title}>
              <p>{item.title}</p>
              <div className='wrapper'>
                {item.dropDown.map((i) => (
                  <p key={i.title}>{i.title}</p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainNav;
