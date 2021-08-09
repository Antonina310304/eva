export type ModalId =
  | 'Info'
  | 'Filters'
  | 'QrCode'
  | 'TryInRoom'
  | 'ProductSlider'
  | 'Fullscreen360'
  | 'SendReview'
  | 'BuyInCredit'
  | 'Showrooms'
  | 'RelatedProducts'
  | 'Review'
  | 'QualityGuarantee'
  | 'Video'
  | 'Showrooms'
  | 'DeliveryInformation'
  | 'ProductPhotos'
  | 'YandexMarket'
  | 'FinalPrice'
  | 'DeliveryInformation';

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
