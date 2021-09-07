import React, { useCallback, memo, FC, MouseEvent } from 'react';
import cn from 'classnames';

import { Modal as IModal } from '@Contexts/Modals';
import ModalMain from '@Components/ModalMain';
import Link from '@UI/Link';
import Scroller from '@UI/Scroller';
import useModals from '@Hooks/useModals';
import { GroupData } from '@Pages/PageCategory/typings';
import styles from './MobileGroupsModal.module.css';

export interface ModalData extends IModal {
  data: {
    label?: string;
    groups: GroupData[];
    onClose?: (e: MouseEvent) => void;
  };
}

export interface MobileOptionsModalProps {
  className?: string;
  modal: ModalData;
}

const MobileOptionsModal: FC<MobileOptionsModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { label, groups } = modal.data;
  const [, { closeModal }] = useModals();

  const handleClose = useCallback(
    (e) => {
      if (typeof modal.data.onClose === 'function') {
        modal.data.onClose(e);
      }

      closeModal(modal.id);
    },
    [closeModal, modal.data, modal.id],
  );

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.content}>
        <div className={styles.containerLabel} onClick={handleClose}>
          <span className={styles.label}>{label}</span>
          <div className={styles.arrow} />
        </div>

        <Scroller className={styles.groups} invisible>
          {groups.map((group, index) => (
            <div className={styles.group} key={index}>
              <div className={styles.groupName}>{group.groupName}</div>

              <div className={styles.categories}>
                {group.categories.map((category, indexCategory) => (
                  <Link className={styles.category} to={category.translite} key={indexCategory}>
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Scroller>
      </div>
    </ModalMain>
  );
};

export default memo(MobileOptionsModal);
