import React, {
  memo,
  HTMLAttributes,
  FC,
  MouseEvent,
  ReactChild,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import { Modal } from '@Contexts/Modals';
import Scroller from '@UI/Scroller';
import IconClose from '@UI/IconClose';
import Loader from '@UI/Loader';
import useMedias from '@Hooks/useMedias';
import styles from './ModalSidebar.module.css';

export interface ModalSidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  modal: Modal;
  loading?: boolean;
  title?: string;
  view?: 'default' | 'fullscreen';
  cnWrapperContent?: string;
  cnHead?: string;
  cnContent?: string;
  footer: ReactChild;
  scrollTop?: number;
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
  onLoad?: () => void;
}

const ModalSidebar: FC<ModalSidebarProps> = (props) => {
  const {
    className,
    children,
    title,
    modal,
    loading,
    view = 'default',
    cnWrapperContent,
    cnHead,
    cnContent,
    footer,
    scrollTop,
    onClose,
    onLoad,
  } = props;
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
      <CSSTransition classNames={{ ...styles }} in={modal.visible} timeout={400}>
        <div className={styles.wrapper}>
          <div className={styles.backdrop} ref={refBackdrop} onClick={handleClickBackdrop} />
          <div className={cn(styles.wrapperContent, cnWrapperContent)}>
            {loading ? (
              <div className={styles.wrapperPreloader}>
                <Loader className={styles.loader} />
              </div>
            ) : (
              <>
                <div className={cn(styles.head, cnHead)}>
                  <h3 className={styles.title}>{title}</h3>
                  <IconClose
                    className={styles.iconClose}
                    view={isMobile ? 'default' : 'circle'}
                    onClick={onClose}
                  />
                </div>

                <Scroller
                  className={cn(styles.containerContent, cnContent)}
                  invisible={isMobile}
                  scrollTop={scrollTop}
                >
                  {children}
                </Scroller>

                {footer && <div className={styles.footer}>{footer}</div>}
              </>
            )}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default memo(ModalSidebar);
