import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import SendReviewForm from '@Forms/SendReviewForm';
import { ProductData } from '@Types/Product';
import styles from './SendReviewModal.module.css';

export interface SendReviewModalProps {
  className?: string;
  modal: IModal;
}

export interface ModalData {
  product: ProductData;
}

const SendReviewModal: FC<SendReviewModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals }] = useModals();
  const { product } = modal.data as ModalData;

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
        <div className={styles.productName}>{`${product.type} ${product.name}`}</div>

        <div className={styles.form}>
          <SendReviewForm product={product} onCancel={handleClose} onSuccess={handleClose} />
        </div>
      </div>
    </Modal>
  );
};

export default memo(SendReviewModal);
