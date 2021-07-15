import React, { useCallback, memo } from 'react';
import cns from 'classnames';

import Modal from '@Components/Modal';
import Fullscreen360 from '@Components/Fullscreen360';
import useModals from '@Hooks/useModals';
import Icon18Close from '@divanru/icons/dist/18/close';

import styles from './Fullscreen360Modal.module.css';

const Fullscreen360Modal = (props) => {
  const { className, modal } = props;
  const [, { closeModal, isVisible }] = useModals();
  const { opts } = modal.data;
  const cylindoOpts = opts;

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <Modal
      className={cns(styles.Fullscreen360Modal, className)}
      id={modal.id}
      visible={isVisible(modal.id)}
    >
      <div className={styles.fullCover} />

      <div className={styles.TopPanel} onClick={handleClose}>
        <Icon18Close className={styles.IconClose} />
      </div>

      <div className={styles.Container}>
        <Fullscreen360 isFullscreen opts={cylindoOpts} onFullscreen={handleClose} />
      </div>
    </Modal>
  );
};

export default memo(Fullscreen360Modal);
