import React, { FC, HTMLAttributes } from 'react';

import styles from './MainNavMobile.module.css';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  mainNavList: any[];
}

const MainNavMobile: FC<MainNavListProps> = ({ mainNavList }) => {
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

export default MainNavMobile;
