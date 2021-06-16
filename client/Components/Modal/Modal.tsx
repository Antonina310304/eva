import React, { useCallback, memo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';
import useOnClickOutside from '@divanru/ts-utils/useOnClickOutside';

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
  const { className, id, visible, children, view = 'default', onClose } = props;
  const [{ animatings }] = useModals();

  const handleClose = useCallback(
    (e) => {
      if (onClose) onClose(e);
    },
    [onClose],
  );

  const refContent = useOnClickOutside(handleClose);

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
        <div className={styles.wrapper}>
          <div className={styles.wrapperContent}>
            <div className={styles.content} ref={refContent}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </KeyboardHandler>
  );
};

export default memo(Modal);
