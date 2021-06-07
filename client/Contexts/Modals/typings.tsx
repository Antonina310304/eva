export type ModalId = 'Info';

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
  openModal: (id: ModalId, data?: any) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
  getData: (id: ModalId) => any;
  isVisible: (id: ModalId) => boolean;
  isAnimating: (id: ModalId) => boolean;
}
