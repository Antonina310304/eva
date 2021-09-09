import React, { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import PublicationDetails from '@Components/PublicationDetails';
import { Modal as IModal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import { PublicationData } from '@Types/Press';
import IconClose from '@UI/IconClose/IconClose';
import styles from './PublicationModal.module.css';

export interface PublicationModalData {
  publications: PublicationData[];
  index: number;
}

export interface PublicationModal extends IModal {
  data: PublicationModalData;
}

export interface PublicationModalProps extends ModalMainProps {
  modal: PublicationModal;
}

const PublicationModal: FC<PublicationModalProps> = (props) => {
  const { className, modal, onClose, ...restProps } = props;
  const { publications, index } = modal.data;
  const [currentIndex, setCurrentIndex] = useState<number>(index);
  const currentPublication = publications[currentIndex];

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return publications.length - 1;
      if (value > publications.length - 1) return 0;

      return value;
    },
    [publications.length],
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
        <IconClose className={styles.iconClose} onClick={onClose} />
        <PublicationDetails publication={currentPublication} />
      </div>
    </ModalMain>
  );
};

export default memo(PublicationModal);
