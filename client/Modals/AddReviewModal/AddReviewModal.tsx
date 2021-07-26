import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';

import styles from './AddReviewModal.module.css';

export interface AddReviewModalProps {
  className?: string;
  modal: IModal;
}

const AddReviewModal: FC<AddReviewModalProps> = (props) => {
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
      <div className={styles.container}>Add Review</div>
    </Modal>
  );
};

export default memo(AddReviewModal);
