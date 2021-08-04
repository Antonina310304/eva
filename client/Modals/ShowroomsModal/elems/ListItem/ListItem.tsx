import React, { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import Link from '@UI/Link';
import List from '@UI/List';
import Image from '@UI/Image';
import styles from './ListItem.module.css';

export interface ShowroomData {
  address: string;
  phone: string;
  worktime: string[];
  images: string[];
}

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  opened?: boolean;
  showroom?: ShowroomData;
  onClickHead?: (e: MouseEvent) => void;
}

const ListItem: FC<ListItemProps> = (props) => {
  const { className, opened, showroom, onClickHead, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.listItem, { [styles.opened]: opened }, className)}>
      <div className={styles.head} onClick={onClickHead}>
        <div className={styles.icon} />
        <div className={styles.address} dangerouslySetInnerHTML={{ __html: showroom.address }} />
      </div>

      <Collapse collapsed={!opened}>
        <div className={styles.content}>
          <div className={styles.contentInfo}>
            <Link className={styles.more} view='secondary' to='/site/showroom' size='s'>
              Подробнее
            </Link>
            <div className={styles.phone}>{showroom.phone}</div>
            <div className={styles.worktime}>{showroom.worktime.join(' ')}</div>
          </div>

          <List
            className={styles.images}
            items={showroom.images}
            renderChild={(image: string) => <Image className={styles.image} src={image} />}
          />
        </div>
      </Collapse>
    </div>
  );
};

export default memo(ListItem);
