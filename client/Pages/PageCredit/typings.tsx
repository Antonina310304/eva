import { BreadcrumbData } from '@Types/Breadcrumbs';
import { NavigationItem } from '@Pages/PageWarranty/typings';

export interface Banner {
  conditions: Array<{ digit: number; symbol: string }>;
  id: string;
  logo?: string; // для логотипа Сбера
  anchor_src?: string; // для логотипа ВТБ
  text?: string; // описание для Сбера
  list?: string[]; // описание для ВТБ
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
