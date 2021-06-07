export type PageName = 'Index' | 'Error';

export type CountryData = 'RUS' | 'BLR';

export type SocialIconId = 'instagram' | 'facebook' | 'vk' | 'ok' | 'youtube' | 'zen';

export interface SocialIconData {
  id: SocialIconId;
  link: string;
}
