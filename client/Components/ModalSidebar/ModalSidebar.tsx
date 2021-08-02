import React, { memo, HTMLAttributes, FC, MouseEvent, useCallback, useRef } from 'react';
import cn from 'classnames';

import { ModalId } from '@Contexts/Modals';
import Scroller from '@UI/Scroller';
import IconClose from '@UI/IconClose';
import useMedias from '@Hooks/useMedias';
import styles from './ModalSidebar.module.css';

export interface ModalSidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: ModalId;
  visible?: boolean;
  loading?: boolean;
  title?: string;
  view?: 'default' | 'fullscreen';
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
}

const ModalSidebar: FC<ModalSidebarProps> = (props) => {
  const { className, children, title, loading, view = 'default', onClose } = props;
  const refBackdrop = useRef<HTMLDivElement>();
  const { isMobile } = useMedias();

  const handleClickWrapper = useCallback(
    (e) => {
      if (e.currentTarget !== refBackdrop.current) return;
      if (onClose) onClose(e);
    },
    [onClose],
  );

  return (
    <div
      className={cn(
        styles.modal,
        {
          [styles.viewDefault]: view === 'default',
          [styles.viewFullscreen]: view === 'fullscreen',
        },
        className,
      )}
    >
      <div className={styles.wrapper}>
        <div className={styles.backdrop} ref={refBackdrop} onClick={handleClickWrapper} />
        <div className={styles.wrapperContent}>
          {loading ? (
            <div>LOADING…</div>
          ) : (
            <>
              <div className={styles.head}>
                <h3 className={styles.title}>{title}</h3>
                <IconClose className={styles.iconClose} onClick={onClose} />
              </div>

              <Scroller className={styles.containerContent} invisible={isMobile}>
                {children}
              </Scroller>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ModalSidebar);
