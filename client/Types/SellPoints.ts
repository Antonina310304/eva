export interface SellPointData {
  id: string;
  regionId: number;
  coordinates: [number, number];
  name: string;
  address: string;
  phone: string;
  worktime: string[];
  holidaysSchedule: string[];
  tags: number[];
  images: string[];
}
