import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Group.module.css';

export interface GroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  cropped?: boolean;
}

const Group: FC<GroupProps> = (props) => {
  const { className, title, cropped, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.group, { [styles.cropped]: cropped }, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {cropped ? <div className={styles.content}>{children}</div> : children}
    </div>
  );
};

export default memo(Group);
