export interface IMainNavSubmenuItems {
  title: string;
  link: string;
}

export interface IBannerMenu {
  title?: string;
  text?: string;
  img?: string;
  link?: string;
  textLink?: string;
  badge?: 'sale';
}

export interface IMainNavSubmenu {
  name: string;
  link: string;
  textLink: string;
  items: IMainNavSubmenuItems[];
}

export interface IMainNav {
  title: string;
  icon: string;
  link?: string;
  img?: string;
  banner?: IBannerMenu;
  withBanner?: boolean;
  dropDown?: IMainNavSubmenu[];
}