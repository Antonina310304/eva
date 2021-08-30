import React, { FC, memo, useCallback } from 'react';

import cn from 'classnames';
import IconClose from '@UI/IconClose';
import PressDetails from '@Components/PressDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
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

export interface ModalData extends IModal {
  data: {
    articles: ArticleData;
  };
}
export interface ModalMainProps {
  className?: string;
  modal: ModalData;
  index: number;
  socials: SocialItem;
}

const ArticleModal: FC<ModalMainProps> = (props) => {
  const { className, modal, socials, index, ...restProps } = props;
  const [, { closeModal }] = useModals();
  const article = modal.data.articles[modal.data.index];

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
          <IconClose className={styles.iconClose} onClick={handleClose} />
        </div>
        <PressDetails article={article} socials={socials} />
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
