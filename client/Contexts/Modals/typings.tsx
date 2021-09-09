export type ModalId =
  | 'Info'
  | 'Filters'
  | 'QrCode'
  | 'TryInRoom'
  | 'ProductSlider'
  | 'Fullscreen360'
  | 'SendReview'
  | 'BuyInCredit'
  | 'ClientsPhotos'
  | 'RelatedProducts'
  | 'Review'
  | 'QualityGuarantee'
  | 'Video'
  | 'Showrooms'
  | 'ProductPhotos'
  | 'InstagramPost'
  | 'YandexMarket'
  | 'FinalPrice'
  | 'PriceDrop'
  | 'NotifyAboutReceipt'
  | 'MobileGroups'
  | 'MobileOptions'
  | 'Cart'
  | 'DeliveryInformation'
  | 'Article'
  | 'Contacts'
  | 'ContactsAccounting'
  | 'RegionSelector'
  | 'OfferAgreement'
  | 'DeliveryInfo'
  | 'Publication'
  | 'Authorization'
  | 'Cooperation';

export interface Modal {
  id: ModalId;
  data: any;
  visible?: boolean;
  opened?: boolean;
}

export interface ModalsState {
  stack?: Modal[];
  currentModal?: Modal;
}

export interface ModalsMethods {
  openModal: (id: ModalId, data?: unknown) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
}
