import React, { FC, memo, useCallback, useState, useMemo } from 'react';

import cn from 'classnames';
import IconClose from '@UI/IconClose';
import PressDetails from '@Components/PressDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import Link from '@UI/Link';
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
  href: string;
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
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return articles.length - 1;
      if (value > articles.length - 1) return 0;

      return value;
    },
    [articles.length],
  );

  console.log(article.href);

  const nextId = useMemo(() => {
    return articles[normalizeIndex(currentIndex + 1)].id;
  }, [currentIndex, normalizeIndex, articles]);

  const prevId = useMemo(() => {
    return articles[normalizeIndex(currentIndex - 1)].id;
  }, [currentIndex, normalizeIndex, articles]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

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
          <Link to={prevId} className={styles.prev} view='simple'>
            <div className={styles.arrowBackground} onClick={handlePrev}>
              <div className={styles.arrow} />
            </div>
          </Link>
          <IconClose className={styles.iconClose} onClick={handleClose} />
          <Link to={nextId} className={styles.next} view='simple'>
            <div className={styles.arrowBackground} onClick={handleNext}>
              <div className={styles.arrow} />
            </div>
          </Link>
        </div>
        <PressDetails article={articles[currentIndex]} socials={meta.data.socials} />
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
