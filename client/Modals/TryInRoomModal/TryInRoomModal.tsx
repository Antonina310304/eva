import React, { useCallback, memo, FC } from 'react';
import QRCode from 'qrcode.react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';

import styles from './TryInRoomModal.module.css';

const TryInRoomModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.infoModal, [className])}
      modal={modal}
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
    </ModalMain>
  );
};

export default memo(TryInRoomModal);
