import React, { useCallback, memo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import IconClose from '@divanru/ts-ui/IconClose';

import useModals from '@Hooks/useModals';
import KeyboardHandler from '@Components/KeyboardHandler';
import { ModalId } from '@Contexts/Modals';
import styles from './Modal.css';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: ModalId;
  needClose?: boolean;
  visible?: boolean;
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
}

const Modal: FC<ModalProps> = (props) => {
  const { className, id, needClose = true, visible, children, onClose } = props;
  const [{ animatings }] = useModals();

  const handleClose = useCallback(
    (e) => {
      if (visible && onClose) onClose(e);
    },
    [visible, onClose],
  );

  return (
    <KeyboardHandler onEscape={onClose}>
      <div className={cn(styles.modal, { [styles.closes]: animatings.includes(id) }, className)}>
        <div className={styles.wrapper}>
          <div className={styles.wrapperContent}>
            <div className={styles.content}>{children}</div>

            {needClose && (
              <div className={styles.close} onClick={handleClose}>
                <IconClose className={styles.closeIcon} />
              </div>
            )}
          </div>
        </div>
      </div>
    </KeyboardHandler>
  );
};

export default memo(Modal);
