import React, { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import Popup from '@UI/Popup';
import Link from '@UI/Link';
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

const GroupsPopup: FC<GroupsPopupProps> = (props) => {
  const { className, label, groups, visible, onClose, ...restProps } = props;
  const ref = useOnClickOutside(onClose, !visible);

  return (
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

      <div
        className={cn(styles.content, {
          [styles.column1]: groups.length === 1,
          [styles.column2]: groups.length === 2,
          [styles.column3]: groups.length === 3,
          [styles.column4]: groups.length >= 4,
        })}
      >
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
  );
};

export default memo(GroupsPopup);
