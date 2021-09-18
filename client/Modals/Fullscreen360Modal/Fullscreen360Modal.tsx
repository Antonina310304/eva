import { FC, useCallback, memo } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import Fullscreen360 from '@Components/Fullscreen360';
import useModals from '@Hooks/useModals';
import Icon18Close from '@divanru/icons/dist/18/close';

import styles from './Fullscreen360Modal.module.css';

const Fullscreen360Modal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();
  const { opts } = modal.data;

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  return (
    <ModalMain {...restProps} className={cn(styles.fullscreen360Modal, className)} modal={modal}>
      <div className={styles.fullCover} />

      <div className={styles.topPanel} onClick={handleClose}>
        <Icon18Close className={styles.iconClose} />
      </div>

      <div className={styles.container}>
        <Fullscreen360 isFullscreen opts={opts} onFullscreen={handleClose} />
      </div>
    </ModalMain>
  );
};

export default memo(Fullscreen360Modal);
