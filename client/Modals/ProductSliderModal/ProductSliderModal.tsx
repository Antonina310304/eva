import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';

import styles from './ProductSliderModal.module.css';

export interface ProductSliderModalProps {
  className?: string;
  modal: IModal;
}

const ProductSliderModal: FC<ProductSliderModalProps> = (props) => {
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
      <div className={styles.container}>ProductSliderModal</div>
      {modal.data.images[0].title}
    </Modal>
  );
};

export default memo(ProductSliderModal);
