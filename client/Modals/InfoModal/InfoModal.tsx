import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import styles from './InfoModal.module.css';

export interface InfoModalProps {
  className?: string;
  modal: IModal;
}

const InfoModal: FC<InfoModalProps> = (props) => {
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
      <div className={cn(styles.container, { [styles.neutral]: !modal.data.view })}>
        <IconClose className={styles.iconClose} />
        <div
          className={cn(styles.icon, {
            [styles.success]: modal.data.view === 'success',
            [styles.error]: modal.data.view === 'error',
          })}
        />
        <div className={styles.title}>{modal.data.title}</div>
        <div className={styles.text}>{modal.data.text}</div>
      </div>
    </Modal>
  );
};

export default memo(InfoModal);
