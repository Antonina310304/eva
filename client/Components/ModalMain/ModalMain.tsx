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
  navigation?: boolean;
  nextHref?: string;
  prevHref?: string;
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: (e: MouseEvent | KeyboardEvent) => void;
  onLoad?: () => void;
}

const ModalMain: FC<ModalMainProps> = (props) => {
  const {
    className,
    modal,
    fullscreen,
    children,
    navigation = false,
    nextHref,
    prevHref,
    onClose,
    onLoad,
    onNext,
    onPrev,
  } = props;
  const refWrapper = useRef();
  const { isMobile } = useMedias();
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

  const prev = useMemo(() => {
    const prevArrow = (
      <div className={cn(styles.arrowBackground, { [styles.prev]: true })} onClick={onPrev}>
        <div className={styles.arrow} />
      </div>
    );

    if (prevHref) {
      return (
        <Link to={prevHref} className={styles.prev} view='simple'>
          {prevArrow}
        </Link>
      );
    }

    return prevArrow;
  }, [onPrev, prevHref]);

  const next = useMemo(() => {
    const nextArrow = (
      <div className={cn(styles.arrowBackground, { [styles.next]: true })} onClick={onNext}>
        <div className={styles.arrow} />
      </div>
    );

    if (nextHref) {
      return (
        <Link to={nextHref} className={styles.next} view='simple'>
          {nextArrow}
        </Link>
      );
    }

    return nextArrow;
  }, [nextHref, onNext]);

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
                {prev}
                {children}
                {next}
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
