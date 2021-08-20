export interface FormItem {
  href?: string;
  data?: { action: string; email: string; title: string };
  text: string;
  title: string;
}

export interface Organization {
  address: OrganizationAddress;
  inn: OrganizationSimpleValue;
  kpp: OrganizationSimpleValue;
  name: OrganizationSimpleValue;
  ogrn: OrganizationSimpleValue;
  phones: { label: string; values: string[] };
}
export interface OrganizationAddress {
  label: string;
  postalCode: string;
  addressLocality: string;
  streetAddress: string;
  additional: string;
}

export interface OrganizationSimpleValue {
  label: string;
  value: string;
}

export interface Map {
  center: number[];
  zoom: number;
  title: string;
  description: string;
  regionId: number;
}

export interface SellPoint {
  id: string;
  regionId: number;
  coordinates: number[];
  name: string;
  address: string;
  phone: string;
  worktime: string[];
  holidaysSchedule: [];
  tags: number[];
  images: string[];
}

export interface Forms {
  items: FormItem[];
  text: string[];
  title: string;
}

export interface PageContactsData {
  title: string;
  organization: Organization;
  forms: Forms;
  map: Map;
  sellPoints: SellPoint[];
}
