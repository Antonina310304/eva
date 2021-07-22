import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';

import styles from './QrCodeModal.module.css';

export interface QrCodeModalProps {
  className?: string;
  modal: IModal;
}

const QrCodeModal: FC<QrCodeModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <Modal
      className={cn(styles.infoModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.text}>{modal.data.qrcode}</div>
      </div>
    </Modal>
  );
};

export default memo(QrCodeModal);
