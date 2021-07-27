import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import SendReviewForm from '@Forms/SendReviewForm';
import styles from './SendReviewModal.module.css';

export interface SendReviewModalProps {
  className?: string;
  modal: IModal;
}

const SendReviewModal: FC<SendReviewModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <Modal
      className={cn(styles.modal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.wrapperTitle}>
          <div className={styles.title}>Мой отзыв</div>
          <div className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.productName}>Диван Динс Velvet Yellow</div>

        <div className={styles.form}>
          <SendReviewForm product={{ id: 4884 }} />
        </div>
      </div>
    </Modal>
  );
};

export default memo(SendReviewModal);
