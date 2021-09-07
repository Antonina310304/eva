import React, { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import PressDetails from '@Components/PressDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useMeta from '@Queries/useMeta';
import { MetaDataSocial } from '@Types/Meta';
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
  socials: MetaDataSocial[];
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
  const { className, modal, onClose, ...restProps } = props;
  const { articles, index } = modal.data;
  const meta = useMeta({ ssr: true });
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const currentArticle = articles[currentIndex];

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return articles.length - 1;
      if (value > articles.length - 1) return 0;

      return value;
    },
    [articles.length],
  );

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      navigation
      onPrev={handlePrev}
      onNext={handleNext}
      onClose={onClose}
    >
      <div className={styles.container}>
        <PressDetails article={currentArticle} socials={meta.data.socials} />
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
