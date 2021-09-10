export interface HeaderMenuData {
  title: string;
  link: string;
}

export interface FooterMenuItemData {
  important?: boolean;
  title?: string;
  text: string;
  textParts?: string[];
  link?: string;
  action?: string;
  iconType?: string;
  items?: FooterMenuItemData[];
  icon?: string;
  theme?: string;
}

export interface FooterMenuData {
  title: string;
  items: FooterMenuItemData[];
}

export interface FooterReviewsData {
  image: string;
  link: string;
  rating: number;
  text: string;
  count?: number;
}

export interface FooterPaymentItemImageData {
  height: number;
  width: number;
  src: string;
}

export interface FooterPaymentItemData {
  image: FooterPaymentItemImageData;
  link: string;
}

export interface FooterPaymentData {
  title: string;
  items: FooterPaymentItemData[];
}

export type FooterRequisitesData = string[];

export type FooterCopyright = [string, string];

export interface FooterData {
  awards?: FooterMenuData;
  press?: FooterMenuData;
  contacts?: FooterMenuData;
  catalog?: FooterMenuData;
  toCustomers?: FooterMenuData;
  feedback?: FooterMenuData;
  schedule?: FooterMenuData;
  copyright?: FooterCopyright;
  reviews?: FooterReviewsData;
  payments?: FooterPaymentData;
  requisites?: FooterRequisitesData;
  socials?: FooterMenuData;
}

export interface SideMenuSubitemData {
  id?: 'divider';
  image?: string;
  title: string;
  url?: string;
  action?: string;
  analytics?: string;
}

export interface SideMenuDetailsData {
  description?: string;
  items: SideMenuSubitemData[];
  theme: 'grid' | 'list' | 'cabinet';
  title: string;
  button?: {
    title: string;
    url: string;
  };
}

export interface SideMenuItemData {
  id: string;
  title: string;
  color: string;
  image: string;
  url: string;
  details?: SideMenuDetailsData;
  action?: string;
  theme?: 'search' | 'cabinet';
  placeholder?: string;
  isCurrent?: boolean;
  view?: 'primary' | 'secondary';
}

export interface SideMenuData {
  bottom: SideMenuItemData[];
  top: SideMenuItemData[];
  useful: SideMenuItemData[];
}

export interface Layout {
  header: HeaderMenuData[];
  footer: FooterData;
  sideMenu: SideMenuData;
}
