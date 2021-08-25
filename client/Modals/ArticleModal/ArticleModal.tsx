import React, { FC, memo, useCallback } from 'react';

import cn from 'classnames';
import IconClose from '@UI/IconClose';
import Icon42ArrowLeft from '@divanru/icons/dist/42/arrow_left';
import Icon42ArrowRight from '@divanru/icons/dist/42/arrow_right';
import { ArticleItem } from '@Pages/PageB2b/typings';
import { Modal as IModal } from '@Contexts/Modals';
import Button from '@UI/Button';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';

import styles from './ArticleModal.module.css';

export interface ModalData extends IModal {
  data: {
    preview: string;
  };
}

export interface ArticleModalProps {
  className?: string;
  modal: ModalData;
}

const ArticleModal: FC<ArticleModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { preview } = modal.data;
  const [, { closeModal }] = useModals();
  console.log(preview);
  const handleClose = useCallback(() => {
    closeModal('Article');
  }, [closeModal]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h3 className={styles.heading}>{preview}</h3>
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>

        <Button className={styles.button}>Узнать подробнее</Button>
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
