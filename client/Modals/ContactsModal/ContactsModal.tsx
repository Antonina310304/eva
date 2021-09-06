import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import ContactsForm from '@Forms/ContactsForm';
import styles from './ContactsModal.module.css';

const ContactsModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.infoModal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.wrapperTitle}>
          <div className={styles.title}>{modal.data.title}</div>
          <IconClose onClick={handleClose} />
        </div>
        <ContactsForm mailTo={modal.data.email} director={modal.data.director} />
      </div>
    </ModalMain>
  );
};

export default memo(ContactsModal);
