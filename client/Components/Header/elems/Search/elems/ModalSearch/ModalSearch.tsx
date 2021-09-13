import React, { HTMLAttributes, FC, useEffect, useState, memo, ReactNode } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose/IconClose';
import useMedias from '@Hooks/useMedias';
import styles from './ModalSearch.module.css';

export interface ModalSearchProps extends HTMLAttributes<HTMLDivElement> {
  isShowModal: boolean;
  hideModal: () => void;
  children: ReactNode;
}

const ModalSearch: FC<ModalSearchProps> = ({ isShowModal, hideModal, children }) => {
  const [isShow, setIsShow] = useState<boolean>(isShowModal);
  const { isOnlyMobile } = useMedias();

  useEffect(() => {
    setIsShow(isShowModal);
  }, [isShowModal]);

  return (
    <div
      className={cn({
        [styles.modal]: isOnlyMobile,
        [styles.modalDesktop]: !isOnlyMobile,
        [styles.show]: isShow,
      })}
    >
      {isOnlyMobile && (
        <button type='button' onClick={hideModal} className={styles.buttonClose}>
          <IconClose />
        </button>
      )}

      <div className={styles.inner}>
        {children}
        <div />
      </div>
    </div>
  );
};

export default memo(ModalSearch);
