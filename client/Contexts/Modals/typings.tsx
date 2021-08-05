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
  | 'Review'
  | 'QualityGuarantee'
  | 'Video'
  | 'Showrooms';

export interface Modal {
  id: ModalId;
  data: any;
  visible?: boolean;
  selected?: boolean;
}

export interface ModalsState {
  stack?: Modal[];
  currentModal?: Modal;
}

export interface ModalsMethods {
  openModal: (id: ModalId, data?: unknown) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
  getData: (id: ModalId) => unknown;
  isVisible: (id: ModalId) => boolean;
}
