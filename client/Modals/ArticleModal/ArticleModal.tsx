import { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import PressDetails from '@Components/PressDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import { ArticleData } from '@Types/Press';
import styles from './ArticleModal.module.css';

export interface ArticleModalData {
  articles: ArticleData[];
  index: number;
}

export interface ArticleModal extends IModal {
  data: ArticleModalData;
}

export interface ArticleModalProps extends ModalMainProps {
  modal: ArticleModal;
}

const ArticleModal: FC<ArticleModalProps> = (props) => {
  const { className, modal, onClose, ...restProps } = props;
  const { articles, index } = modal.data;
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
        <PressDetails article={currentArticle} />
      </div>
    </ModalMain>
  );
};

export default memo(ArticleModal);
