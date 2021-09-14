import React, { useCallback, memo, FC } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import IconClose from '@UI/IconClose';
import SendMessageForm from '@Forms/SendMessageForm';
import styles from './QuestionModal.module.css';

const QuestionModal: FC<ModalMainProps> = (props) => {
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
      <div className={styles.container}>
        <IconClose className={styles.iconClose} onClick={handleClose} />
        <div className={styles.title}>Задать вопрос</div>
        <SendMessageForm className={styles.form} />
      </div>
    </ModalMain>
  );
};

export default memo(QuestionModal);
