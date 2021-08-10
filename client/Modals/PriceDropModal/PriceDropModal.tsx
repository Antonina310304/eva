import React, { useCallback, useEffect, memo, FC } from 'react';
import cn from 'classnames';

import { Modal as IModal } from '@Contexts/Modals';
import ModalMain from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import Link from '@UI/Link';

import styles from './PriceDropModal.module.css';
import PriceDropForm from './PriceDropForm';

export interface ModalData extends IModal {
  data: {
    title: string;
    message: string[];
    cta: {
      text: string;
      link: string;
    };
  };
}
export interface PriceDropModalProps {
  className?: string;
  modal: ModalData;
}

const PriceDropModal: FC<PriceDropModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();
  const id = 'PriceDrop';

  const handleClose = useCallback(() => {
    closeModal('PriceDrop');
  }, [closeModal]);

  useEffect(() => {
    (window.dataLayer = window.dataLayer || []).push({
      eCategory: 'priceDropForm',
      eAction: 'open',
      eLabel: `${modal.id}`,
      eNI: false,
      event: 'GAEvent',
    });
  }, [modal.id]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>Снижение цены</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <div className={styles.description}>
          Как только цена на товар снизится, мы сразу сообщим вам об этом по почте.
        </div>
        <PriceDropForm id={modal.id} price={modal.price} />
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

export default memo(PriceDropModal);
