import { SellPointData } from '@Types/SellPoints';
import { MapData } from '@Types/Map';
import { BreadcrumbData } from '@Types/Breadcrumbs';
import { CatalogData } from '@Types/Catalog';

export interface Announcement {
  note: string;
  text: string;
  title: string;
}

export interface CurrentSellPointData extends Omit<SellPointData, 'coordinates'> {
  coordinates: {
    center: [number, number];
    zoom: number;
  };
}

export interface PageShowroomData {
  announcement: Announcement;
  breadcrumbs: BreadcrumbData[];
  categories: CatalogData[];
  currentSellPoints: CurrentSellPointData[];
  title: string;
  map: MapData;
}
