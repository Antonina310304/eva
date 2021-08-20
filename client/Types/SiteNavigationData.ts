import React from 'react';

export interface SiteNavigationData {
  title: string;
  url?: string;
  isExternalLink?: boolean;
  // onClick?: (event: React.SyntheticEvent<HTMLSpanElement, MouseEvent>) => void;
}

export interface FooterMenuData {
  title: string;
  id: string;
  childrenList: SiteNavigationData[];
}

export interface FooterNavData {
  title: string;
  childrenList?: SiteNavigationData[];
}
