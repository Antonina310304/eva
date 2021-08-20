import React, { FC, HTMLAttributes, MouseEvent, memo, useEffect } from 'react';
import cn from 'classnames';

import Popup from '@UI/Popup';
import Link from '@UI/Link';
import useMedias from '@Hooks/useMedias';
import useModals from '@Hooks/useModals';
import useOnClickOutside from '@Hooks/useOnClickOutside';
import { GroupData } from '@Pages/PageCategory/typings';
import styles from './GroupsPopup.module.css';

export interface GroupsPopupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  groups: GroupData[];
  visible?: boolean;
  onClose?: (e: MouseEvent) => void;
}

const modalId = 'MobileGroups';
const GroupsPopup: FC<GroupsPopupProps> = (props) => {
  const { className, label, groups, visible, onClose, ...restProps } = props;
  const { isMobile } = useMedias();
  const [, { openModal, closeModal }] = useModals();
  const ref = useOnClickOutside(onClose, !visible);

  useEffect(() => {
    if (!isMobile || !visible) {
      closeModal(modalId);
      return;
    }

    openModal(modalId, { label, groups, onClose });
  }, [closeModal, groups, isMobile, label, onClose, openModal, visible]);

  return !isMobile ? (
    <Popup
      {...restProps}
      className={cn(styles.popup, { [styles.visible]: visible }, className)}
      visible={visible}
      ref={ref}
    >
      <div className={styles.containerLabel} onClick={onClose}>
        <span className={styles.label}>{label}</span>
        <div className={styles.arrow} />
      </div>

      <div className={styles.content}>
        {groups.map((group, index) => (
          <div className={styles.group} key={index}>
            <div className={styles.groupName}>{group.groupName}</div>

            <div className={styles.categories}>
              {group.categories.map((category, indexCategory) => (
                <Link
                  className={styles.category}
                  to={category.translite}
                  view='simple'
                  key={indexCategory}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Popup>
  ) : null;
};

export default memo(GroupsPopup);
