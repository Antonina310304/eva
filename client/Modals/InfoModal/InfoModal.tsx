import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import styles from './InfoModal.module.css';

const InfoModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeAllModals }] = useModals();

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.infoModal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={cn(styles.container, { [styles.neutral]: !modal.data.view })}>
        <IconClose className={styles.iconClose} onClick={handleClose} />
        <div
          className={cn(styles.icon, {
            [styles.success]: modal.data.view === 'success',
            [styles.error]: modal.data.view === 'error',
          })}
        />
        <div className={styles.title}>{modal.data.title}</div>
        <div className={styles.text}>{modal.data.text}</div>
      </div>
    </ModalMain>
  );
};

export default memo(InfoModal);
