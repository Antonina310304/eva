export interface MapData {
  center: number[];
  zoom: number;
  title: string;
  description: string;
  regionId: number;
}

export interface SellPointData {
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
