import { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import CallbackForm from '@Forms/CallbackForm';
import styles from './CallbackModal.module.css';

const CallbackModal: FC<ModalMainProps> = (props) => {
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
        <IconClose className={styles.iconClose} onClick={handleClose} />
        <div className={styles.title}>Заказать обратный звонок</div>
        <CallbackForm className={styles.form} />
      </div>
    </ModalMain>
  );
};

export default memo(CallbackModal);
