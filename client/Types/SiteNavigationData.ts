export interface SiteNavigationData {
  title: string;
  url?: string;
  isExternalLink?: boolean;
}

export interface FooterNavData {
  title: string;
  childrenList?: SiteNavigationData[];
}
