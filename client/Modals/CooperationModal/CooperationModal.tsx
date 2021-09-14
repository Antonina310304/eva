import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import CooperationForm from '@Forms/CooperationForm';
import styles from './CooperationModal.module.css';

const CooperationModal: FC<ModalMainProps> = (props) => {
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
        <CooperationForm mailTo={modal.data.email} page={modal.data.page} />
      </div>
    </ModalMain>
  );
};

export default memo(CooperationModal);
