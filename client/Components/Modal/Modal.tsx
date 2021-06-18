import React, { useCallback, useRef, memo, HTMLAttributes, FC, MouseEvent } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import KeyboardHandler from '@Components/KeyboardHandler';
import { ModalId } from '@Contexts/Modals';
import styles from './Modal.module.css';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: ModalId;
  visible?: boolean;
  view?: 'default' | 'slide-right';
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { className, id, children, view = 'default', onClose } = props;
  const [{ animatings }, { closeModal }] = useModals();
  const refWrapper = useRef();

  const handleClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== refWrapper.current) return;

      closeModal(id);
      if (onClose) onClose(e);
    },
    [closeModal, id, onClose],
  );

  return (
    <KeyboardHandler onEscape={onClose}>
      <div
        className={cn(
          styles.modal,
          {
            [styles.closes]: animatings.includes(id),
            [styles.viewDefault]: view === 'default',
            [styles.viewSlideRight]: view === 'slide-right',
          },
          className,
        )}
      >
        <div className={styles.wrapper} ref={refWrapper} onClick={handleClose}>
          <div className={styles.wrapperContent}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </KeyboardHandler>
  );
};

export default memo(Modal);
