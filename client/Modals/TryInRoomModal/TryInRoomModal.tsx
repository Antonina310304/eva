import React, { useCallback, memo, FC } from 'react';
import QRCode from 'qrcode.react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';

import styles from './TryInRoomModal.module.css';

export interface TryInRoomModalProps {
  className?: string;
  modal: IModal;
}

const TryInRoomModal: FC<TryInRoomModalProps> = (props) => {
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
        <div className={styles.head}>
          <h2 className={styles.title}>Примерить в комнате</h2>
          <IconClose onClick={handleClose} />
        </div>
        <div className={styles.description}>
          Наведите камеру телефона на QR-код, чтобы посмотреть на мебель в интерьере с помощью
          дополненной реальности.
        </div>
        <div className={styles.containerQrcode}>
          <QRCode className={styles.qrcode} value={modal.data.qrcode} size={180} />
        </div>
        <div className={styles.hint}>
          *Для смартфонов и планшетов с поддержкой дополненной реальности.
        </div>
      </div>
    </Modal>
  );
};

export default memo(TryInRoomModal);
