export interface SiteNavigationData {
  title: string;
  url?: string;
}

export interface FooterNavData {
  title: string;
  childrenList?: SiteNavigationData[];
}
