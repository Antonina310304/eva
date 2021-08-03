import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List/List';
import styles from './PopoverInfo.module.css';

export interface PopoverInfoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  description: string[];
  visibility: boolean;
}

const PopoverInfo: FC<PopoverInfoProps> = (props) => {
  const { className, description, visibility, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.popoverInfo, { [styles.visible]: visibility }, className)}
    >
      <List
        className={styles.content}
        items={description}
        renderChild={(item: string) => <div className={styles.p}>{item}</div>}
      />
    </div>
  );
};

export default memo(PopoverInfo);
