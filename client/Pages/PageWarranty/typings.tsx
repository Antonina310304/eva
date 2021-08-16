import { BreadcrumbData } from '@Types/Breadcrumbs';

export interface NavigationItem {
  name: string;
  href: string;
  active?: boolean;
}

export interface Schedule {
  name: string;
  type: string;
  value: string;
}

export interface Warranty {
  id: string;
  src: string;
  text: string;
}

export interface PageWarrantyData {
  attention: any;
  breadcrumbs: BreadcrumbData[];
  conditions: string[];
  description: string[];
  docs: any;
  feedback: boolean;
  feedbackLink: string;
  oferta: string;
  pageList: NavigationItem[];
  popup: any;
  refund: string[];
  schedule: Schedule[];
  warranty: Warranty[];
}
