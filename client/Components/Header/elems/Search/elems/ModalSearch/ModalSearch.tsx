import React, { HTMLAttributes, memo, ReactNode, forwardRef, MouseEvent } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose/IconClose';
import useMedias from '@Hooks/useMedias';
import styles from './ModalSearch.module.css';

export interface ModalSearchProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  children: ReactNode;
  onClose?: (e: MouseEvent) => void;
}

const ModalSearch = forwardRef<HTMLDivElement, ModalSearchProps>(
  ({ visible, onClose, children }, ref) => {
    const { isOnlyMobile } = useMedias();

    return (
      <div
        className={cn({
          [styles.modal]: isOnlyMobile,
          [styles.modalDesktop]: !isOnlyMobile,
          [styles.show]: visible,
        })}
        ref={ref}
      >
        {isOnlyMobile && (
          <button type='button' onClick={onClose} className={styles.buttonClose}>
            <IconClose />
          </button>
        )}

        <div className={styles.inner}>
          {children}
          <div />
        </div>
      </div>
    );
  },
);

export default memo(ModalSearch);
