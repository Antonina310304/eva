import React, { useCallback, useRef, useEffect, memo, HTMLAttributes, FC, MouseEvent } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import { Modal as IModal } from '@Contexts/Modals';
import styles from './ModalMain.module.css';

export interface ModalMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  modal: IModal;
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
  onLoad?: () => void;
}

const ModalMain: FC<ModalMainProps> = (props) => {
  const { className, modal, children, onClose, onLoad } = props;
  const refWrapper = useRef();

  const handleClickWrapper = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target !== refWrapper.current) return;

      if (onClose) onClose(e);
    },
    [onClose],
  );

  const handleEscape = useCallback(
    (e) => {
      if (onClose) onClose(e);
    },
    [onClose],
  );

  useEffect(() => {
    if (onLoad) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboardEvents({ onEscape: handleEscape });

  return (
    <CSSTransition classNames={{ ...styles }} in={modal.visible} timeout={400}>
      <div className={cn(styles.modal, className)}>
        <div className={styles.container}>
          <div className={styles.wrapper} ref={refWrapper} onClick={handleClickWrapper}>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(ModalMain);
