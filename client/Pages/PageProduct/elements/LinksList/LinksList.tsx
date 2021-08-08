import React, { FC, HTMLAttributes, memo, MouseEvent, ReactElement, useCallback } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import styles from './LinksList.module.css';

export interface LinksListItem {
  icon?: ReactElement;
  label: string;
  link?: string;
  hasArrow?: boolean;
  onClick?: (e: MouseEvent) => void;
}

export interface LinksListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  items?: LinksListItem[];
}

const LinksList: FC<LinksListProps> = (props) => {
  const { className, items, ...restProps } = props;

  const handleClickItem = useCallback((e: MouseEvent, item: LinksListItem) => {
    if (item.onClick) item.onClick(e);
  }, []);

  return (
    <List
      {...restProps}
      className={cn(styles.list, className)}
      items={items}
      renderChild={(item: LinksListItem) => (
        <div className={styles.item} onClick={(e) => handleClickItem(e, item)}>
          <div className={styles.itemContent}>
            {item.icon && <div className={styles.itemIcon}>{item.icon}</div>}
            <div className={styles.itemLabel}>{item.label}</div>
          </div>

          {item.hasArrow && <div className={styles.arrow} />}
        </div>
      )}
    />
  );
};

export default memo(LinksList);
