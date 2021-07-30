export type PageName = 'Index' | 'Category' | 'Error';

export type CountryData = 'RUS' | 'BLR';

export type SocialIconId = 'instagram' | 'facebook' | 'vk' | 'ok' | 'youtube' | 'zen';

export type NetworkStatus = 'pending' | 'loading' | 'success' | 'error';

export interface SocialIconData {
  id: SocialIconId;
  link: string;
}
