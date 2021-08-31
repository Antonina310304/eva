import React, { FC, memo, useCallback } from 'react';

import cn from 'classnames';
import IconClose from '@UI/IconClose';
import PressDetails from '@Components/PressDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useMeta from '@Queries/useMeta';
import useModals from '@Hooks/useModals';
import styles from './ArticleModal.module.css';

export interface SocialItem {
  id: number;
  link: string;
}
export interface ArticleData {
  link: string;
  preview: string;
  src: string;
  logo: string;
  text: string;
  index: number;
  images: string[];
}

export interface ArticleModalData {
  articles: ArticleData[];
  socials: any[];
  index: number;
}

export interface ArticleModal extends IModal {
  data: ArticleModalData;
}

export interface ArticleModalProps extends ModalMainProps {
  modal: ArticleModal;
  index: number;
  socials: SocialItem;
}

const ArticleModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { closeModal }] = useModals();
  const { articles, index } = modal.data;
  const meta = useMeta({ ssr: true });
  const article = articles[index];

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
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <PressDetails article={article} socials={meta.data.socials} />
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
