import React, { FC, useCallback, memo } from 'react';
import cns from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Fullscreen360 from '@Components/Fullscreen360';
import useModals from '@Hooks/useModals';
import Icon18Close from '@divanru/icons/dist/18/close';

import styles from './Fullscreen360Modal.module.css';

export interface Fullscreen360ModalProps {
  className?: string;
  modal: IModal;
}

const Fullscreen360Modal: FC<Fullscreen360ModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeModal, isVisible }] = useModals();
  const { opts } = modal.data;

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <Modal
      className={cns(styles.fullscreen360Modal, className)}
      id={modal.id}
      visible={isVisible(modal.id)}
    >
      <div className={styles.fullCover} />

      <div className={styles.topPanel} onClick={handleClose}>
        <Icon18Close className={styles.iconClose} />
      </div>

      <div className={styles.container}>
        <Fullscreen360 isFullscreen opts={opts} onFullscreen={handleClose} />
      </div>
    </Modal>
  );
};

export default memo(Fullscreen360Modal);
