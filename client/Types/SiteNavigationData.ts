export interface SiteNavigationData {
  title: string;
  url?: string;
  isExternalLink?: boolean;
  isRedirectToDevice?: boolean;
}

export interface FooterNavData {
  title: string;
  childrenList?: SiteNavigationData[];
}
