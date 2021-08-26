import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Group.module.css';

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const Group: FC<GroupProps> = (props) => {
  const { className, title, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.styles, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};

export default memo(Group);
