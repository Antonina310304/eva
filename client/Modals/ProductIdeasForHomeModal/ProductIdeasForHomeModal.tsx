import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import { Modal as IModal } from '@Contexts/Modals';
import ModalMain from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Link from '@UI/Link';
import { ProductData } from '@Types/Product';
import styles from './ProductIdeasForHomeModal.module.css';

export interface ModalData extends IModal {
  data: {
    product: ProductData;
  };
}
export interface NotifyAboutReceiptModalProps {
  className?: string;
  modal: ModalData;
}

const ProductIdeasForHomeModal: FC<NotifyAboutReceiptModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>Уведомить о поступлении</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>
          Как только товар появится, мы сразу сообщим вам об этом по почте.
        </div>
        <div className={styles.info}>
          *Подписываясь, вы соглашаетесь с
          <Link
            className={styles.link}
            to='/static-page/privacy-policy'
            target='_blank'
            view='native'
          >
            {' политикой конфиденциальности '}
          </Link>
          и получением рекламно-информационных рассылок
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(ProductIdeasForHomeModal);
