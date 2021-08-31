import React, { HTMLAttributes, FC, useEffect, useState, memo, ReactNode } from 'react';
import cn from 'classnames';
import IconClose from '@UI/IconClose/IconClose';
import useMediaQuery from '@Hooks/useMediaQuery';
import styles from './ModalSearch.module.css';

export interface ModalSearchProps extends HTMLAttributes<HTMLDivElement> {
  isShowModal: boolean;
  hideModal: () => void;
  children: ReactNode;
}

const ModalSearch: FC<ModalSearchProps> = ({ isShowModal, hideModal, children }) => {
  const [isShow, setIsShow] = useState<boolean>(isShowModal);
  const isMobile = useMediaQuery('(max-width: 1365px)');

  useEffect(() => {
    setIsShow(isShowModal);
  }, [isShowModal]);

  return (
    <div
      className={cn(
        { [styles.modal]: isMobile, [styles.modalDesktop]: !isMobile },
        isShow && styles.show,
      )}
    >
      {isMobile && (
        <button type='button' onClick={hideModal} className={styles.buttonClose}>
          <IconClose />
        </button>
      )}

      <div data-t='inner' className={styles.inner}>
        {children}
        <div />
      </div>
    </div>
  );
};

export default memo(ModalSearch);
