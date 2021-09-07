import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  memo,
  HTMLAttributes,
  FC,
  MouseEvent,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';

import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import useMedias from '@Hooks/useMedias';
import Link from '@UI/Link';
import { Modal as IModal } from '@Contexts/Modals';
import styles from './ModalMain.module.css';

export interface ModalMainProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  modal: IModal;
  fullscreen?: boolean;
  navigation?: { nextHref: string; prevHref: string } | boolean;
  onNext?: (e: MouseEvent | KeyboardEvent) => void;
  onPrev?: (e: MouseEvent | KeyboardEvent) => void;
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
  onLoad?: () => void;
}

const ModalMain: FC<ModalMainProps> = (props) => {
  const {
    className,
    modal,
    fullscreen,
    children,
    navigation,
    onClose,
    onLoad,
    onNext,
    onPrev,
  } = props;
  const refWrapper = useRef();
  const { isMobile } = useMedias();

  const nextHref = useMemo(() => {
    if (typeof navigation === 'boolean') return '#';

    return navigation?.nextHref || '#';
  }, [navigation]);

  const prevHref = useMemo(() => {
    if (typeof navigation === 'boolean') return '#';

    return navigation?.nextHref || '#';
  }, [navigation]);

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

  const handleNext = useCallback(
    (e) => {
      if (onNext) onNext(e);
    },
    [onNext],
  );

  const handlePrev = useCallback(
    (e) => {
      if (onPrev) onPrev(e);
    },
    [onPrev],
  );

  useEffect(() => {
    if (onLoad) onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboardEvents({ onEscape: handleEscape });

  return (
    <CSSTransition classNames={{ ...styles }} in={modal.visible} timeout={400}>
      <div className={cn(styles.modal, { [styles.fullscreen]: fullscreen }, className)}>
        <div className={styles.container}>
          <div className={styles.wrapper} ref={refWrapper} onClick={handleClickWrapper}>
            {navigation && !isMobile ? (
              <div className={styles.navigationWrapper}>
                <Link
                  to={prevHref}
                  className={styles.prev}
                  preventDefault={typeof navigation === 'boolean'}
                  onClick={handlePrev}
                >
                  <div className={cn(styles.arrowBackground, { [styles.prev]: true })}>
                    <div className={styles.arrow} />
                  </div>
                </Link>

                {children}

                <Link
                  to={nextHref}
                  className={styles.next}
                  preventDefault={typeof navigation === 'boolean'}
                  onClick={handleNext}
                >
                  <div className={cn(styles.arrowBackground, { [styles.next]: true })}>
                    <div className={styles.arrow} />
                  </div>
                </Link>
              </div>
            ) : (
              <div className={styles.content}>{children}</div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default memo(ModalMain);
