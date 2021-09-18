import { HTMLAttributes, memo, ReactNode, MouseEvent, FC } from 'react';
import cn from 'classnames';

import IconClose from '@UI/IconClose';
import useMedias from '@Hooks/useMedias';
import styles from './ModalSearch.module.css';

export interface ModalSearchProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  children: ReactNode;
  onClose?: (e: MouseEvent) => void;
}

const ModalSearch: FC<ModalSearchProps> = ({ visible, children, onClose }) => {
  const { isOnlyMobile } = useMedias();

  return (
    <div
      className={cn({
        [styles.modal]: isOnlyMobile,
        [styles.modalDesktop]: !isOnlyMobile,
        [styles.visible]: visible,
      })}
    >
      {isOnlyMobile && (
        <button type='button' className={styles.buttonClose} onClick={onClose}>
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
