import { OrderData } from '@Types/Order';

export interface ProfileSocial {
  name: string;
  href: string;
  active: boolean;
}

export interface ProfileBalance {
  total: number;
  active: number;
}

export type ProfileBonusHistory = ProfileBonusHistoryItem[];

export interface ProfileBonusHistoryItem {
  type: 'income' | 'expense';
  createdDate: string;
  availableDate: string;
  expirationDate?: string;
  amount: number;
  comment: string;
}

export interface ProfileMenuItemData {
  id: string;
  title: string;
  link: string;
}

export interface Profile {
  firstName: string;
  middleName: string;
  lastName: string;
  email?: string;
  phone: string;
  additionalPhone?: string;
  birthDate?: string;
  registrationDate: string;
  addresses: string[];
  gender: 'male' | 'female' | 'unknown';
  socials: ProfileSocial[];
  balance: ProfileBalance;
  bonusHistory?: ProfileBonusHistory;
  menu?: ProfileMenuItemData[];
  orders?: OrderData[];
  /** Отвечает за отображение приветственного попапа после авторизации */
  welcome?: boolean;
}
