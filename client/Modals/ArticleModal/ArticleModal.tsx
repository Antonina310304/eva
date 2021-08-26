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

export interface ArticleData {
  link: string;
  preview: string;
  src: string;
  logo: string;
  text: string;
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
}

const ArticleModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { articles } = modal.data;
  const [, { closeModal }] = useModals();

  // Ты передаешь в модалку не одну статью, а массив статей
  // Затем пытаешься работать с массивов статей как будто это одна статья
  // const { preview, link, src, logo, text, images } = modal.data.articles;

  console.log('This is articles', articles);
  console.log('This is first arcticle', articles[0]);

  // А это превью для ПЕРВОЙ статьи из массива, но не для той, на которую нажали
  // Тебе нужно передавать выбранную статью в модалку, а не все статьи
  // Либо передавать все статьи как сейчас, а ещё индекс выбранной и делать что-то такое
  // const article = modal.data.articles[modal.data.selectedIndex];
  const { preview } = articles[2];

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
