import React, { FC, HTMLAttributes } from 'react';

export interface SiteNavListProps extends HTMLAttributes<HTMLDivElement> {
  siteNavList: any[];
}

const SiteNav: FC<SiteNavListProps> = ({ siteNavList }) => {
  return (
    <div>
      <ul>
        {siteNavList.map((item) => {
          return (
            <li key={item.title}>
              <a>{item.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiteNav;
