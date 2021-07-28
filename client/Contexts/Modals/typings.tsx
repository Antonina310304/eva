export type ModalId =
  | 'Info'
  | 'Filters'
  | 'TryInRoom'
  | 'ProductSlider'
  | 'Fullscreen360'
  | 'SendReview';

export interface Modal {
  id: ModalId;
  data: any;
  visible?: boolean;
}

export type ModalsMap = Record<ModalId, Modal>;

export interface ModalsState {
  modals?: ModalsMap;
  animatings?: ModalId[];
  currentModal?: Modal;
}

export interface ModalsMethods {
  openModal: (id: ModalId, data?: unknown) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
  getData: (id: ModalId) => unknown;
  isVisible: (id: ModalId) => boolean;
  isAnimating: (id: ModalId) => boolean;
}
