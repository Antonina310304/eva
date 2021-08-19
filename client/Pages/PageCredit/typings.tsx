import { BreadcrumbData } from '@Types/Breadcrumbs';
import { NavigationItem } from '@Pages/PageWarranty/typings';

export interface Condition {
  digit: number;
  symbol: string;
}

export interface Banner {
  conditions: Condition[];
  id: string;
  /** для логотипа Сбера */
  logo?: string;
  /** для логотипа ВТБ */
  anchor_src?: string;
  /** описание для Сбера */
  text?: string;
  /** описание для ВТБ */
  list?: string[];
  note: string;
}

export interface Installment {
  list: string[];
  note: string;
  title: string;
}

export interface Partner {
  card: string;
  id: string;
  list: string[];
  logo: string;
  name: string;
  note: string;
  text: string;
  title: string;
}

export interface PageCreditData {
  banners: Banner[];
  breadcrumbs: BreadcrumbData[];
  installment: Installment;
  pageList: NavigationItem[];
  partners: Partner[];
  popup: any;
  top_text: string;
}
