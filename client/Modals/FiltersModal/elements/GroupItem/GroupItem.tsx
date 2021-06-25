import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './GroupItem.module.css';

export interface GroupItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const GroupItem: FC<GroupItemProps> = (props) => {
  const { className, title, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.groupItem, className)}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};

GroupItem.displayName = 'GroupItem';

export default memo(GroupItem);
