export type IconSocialId = 'dzen' | 'facebook' | 'instagram' | 'tiktok' | 'vk' | 'youtube';
export type IconPayment = 'masterCard' | 'visa' | 'mir';

export interface IconData {
  name: string;
  link?: string;
  icon: IconSocialId;
  target?: string;
}

export interface IconPaymentData {
  name: string;
  icon: IconPayment;
}
