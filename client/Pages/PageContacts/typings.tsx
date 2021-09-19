import { MapData } from '@Types/Map';
import { SellPointData } from '@Types/SellPoints';

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

export interface Forms {
  items: FormItem[];
  text: string[];
  title: string;
}

export interface PickUpPoint {
  isVisible: boolean;
  label: string;
  address: {
    postalCode: string;
    addressLocality: string;
    streetAddress: string;
    additional: string;
  };
  phones: {
    label: string;
    values: string[];
  };
}

export interface PageContactsData {
  title: string;
  organization: Organization;
  forms: Forms;
  map: MapData;
  sellPoints: SellPointData[];
  pickUpPoints: PickUpPoint[];
}
