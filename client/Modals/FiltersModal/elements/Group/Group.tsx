import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import styles from './Group.module.css';

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  defaultCollapsed?: boolean;
}

const Group: FC<GroupProps> = (props) => {
  const { className, title, defaultCollapsed, children, ...restProps } = props;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleClickHead = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div {...restProps} className={cn(styles.group, { [styles.collapsed]: collapsed }, className)}>
      <div className={styles.head} onClick={handleClickHead}>
        <div className={styles.title}>{title}</div>
        <div className={styles.arrow} />
      </div>

      <Collapse className={styles.wrapperContent} collapsed={collapsed}>
        <div className={styles.content}>{children}</div>
      </Collapse>
    </div>
  );
};

export default memo(Group);
