import { IMainNav } from '@Types/MainNav';

interface ISiteNav {
  title: string;
  link: string;
  submenu?: IMainNav[];
}

export default ISiteNav;
