export interface IMainNavSubmenuItems {
  title: string;
  link: string;
}

export interface IMainNavSubmenu {
  name: string;
  link: string;
  items: IMainNavSubmenuItems[];
}

export interface IMainNav {
  title: string;
  icon: string;
  link: string;
  img: string;
  dropDown: IMainNavSubmenu[];
}
