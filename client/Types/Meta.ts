export interface MetaPhoneData {
  code: string;
  country: string;
  operator: string;
  phone: string;
}

export interface MetaDataRegion {
  code: string;
  id: number;
  url: string;
  name: string;
  isPec: boolean;
}

export interface MetaDataSocial {
  id: 'instagram' | 'facebook' | 'vk' | 'youtube';
  link: string;
}

export interface MetaDataMessenger {
  id: 'whatsapp' | 'viber' | 'telegram' | 'any';
  title: string;
}

export interface MetaData {
  constructor: {
    pathApi: string;
  };
  country: 'RUS' | 'BLR';
  currency: 'RUB' | 'BYN';
  currencyRate: number;
  domain: string;
  instagram: {
    name: string;
    link: string;
  };
  pathRedirectToCart: string;
  phones: MetaPhoneData[];
  region: MetaDataRegion;
  resources: string;
  socials: MetaDataSocial[];
  videoConsultationMessengers: MetaDataMessenger[];
  gtm?: string;
  personalAreaAvailable?: boolean;
  isOperator?: boolean;
  isOperatorPopupShow?: boolean;
  isTerminal?: boolean;
  pageUrl?: string;
  /** Необходимые данные для того чтобы оставить отзыв о сайте, после оформления заказа */
  review?: {
    checkout?: {
      code: string;
      url: string;
    };
  };
  services?: {
    shipping: string;
  };
}
