import React, { useCallback, memo, FC, MouseEvent } from 'react';
import cn from 'classnames';

import { Modal as IModal } from '@Contexts/Modals';
import ModalMain from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import styles from './MobileOptionsModal.module.css';

export interface OptionData {
  id: string;
  name: string;
  selected?: boolean;
}

export interface ModalData extends IModal {
  data: {
    label?: string;
    options: OptionData[];
    onCheckOption?: (e: MouseEvent, option: OptionData) => void;
    onClose?: (e: MouseEvent) => void;
  };
}

export interface MobileOptionsModalProps {
  className?: string;
  modal: ModalData;
}

const MobileOptionsModal: FC<MobileOptionsModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { label, options } = modal.data;
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(
    (e) => {
      if (typeof modal.data.onClose === 'function') {
        modal.data.onClose(e);
      }

      closeModal(modal.id);
    },
    [closeModal, modal.data, modal.id],
  );

  const handleCheckOption = useCallback(
    (e: MouseEvent, option: OptionData) => {
      if (typeof modal.data.onCheckOption === 'function') modal.data.onCheckOption(e, option);
      handleClose(e);
    },
    [handleClose, modal.data],
  );

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.content}>
        <div className={styles.containerLabel}>
          <span className={styles.label}>{label}</span>
          <div className={styles.arrow} />
        </div>

        <div className={styles.options}>
          {options.map((option) => (
            <div
              className={cn(styles.option, { [styles.selected]: option.selected })}
              key={option.id}
              onClick={(e) => handleCheckOption(e, option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(MobileOptionsModal);
