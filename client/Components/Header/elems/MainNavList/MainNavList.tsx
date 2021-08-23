import React, { FC, HTMLAttributes } from 'react';

export interface MainNavListProps extends HTMLAttributes<HTMLDivElement> {
  mainNavList: any[];
}

const MainNavList: FC<MainNavListProps> = ({ mainNavList }) => {
  return (
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
  );
};

export default MainNavList;
