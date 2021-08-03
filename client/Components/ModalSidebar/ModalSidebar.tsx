import React, { memo, HTMLAttributes, FC, MouseEvent, useCallback, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { ModalId } from '@Contexts/Modals';
import Scroller from '@UI/Scroller';
import IconClose from '@UI/IconClose';
import Loader from '@UI/Loader';
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
  onLoad?: () => void;
}

const ModalSidebar: FC<ModalSidebarProps> = (props) => {
  const { className, children, title, loading, visible, view = 'default', onClose, onLoad } = props;
  const { isMobile } = useMedias();
  const refBackdrop = useRef<HTMLDivElement>();

  const handleClickBackdrop = useCallback(
    (e) => {
      if (e.currentTarget !== refBackdrop.current) return;
      if (onClose) onClose(e);
    },
    [onClose],
  );

  useEffect(() => {
    if (onLoad) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <CSSTransition classNames={{ ...styles }} in={visible} timeout={400}>
        <div className={styles.wrapper}>
          <div className={styles.backdrop} ref={refBackdrop} onClick={handleClickBackdrop} />
          <div className={styles.wrapperContent}>
            {loading ? (
              <div className={styles.wrapperPreloader}>
                <Loader className={styles.loader} />
              </div>
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
      </CSSTransition>
    </div>
  );
};

export default memo(ModalSidebar);
