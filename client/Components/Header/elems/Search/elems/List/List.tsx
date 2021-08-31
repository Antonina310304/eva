import React, { FC, HTMLAttributes } from 'react';
import Link from '@UI/Link';

import cn from 'classnames';
import styles from './List.module.css';

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  classNameTitle?: string;
  title?: string;
  list: any[];
}

const List: FC<ListProps> = ({ title, className, classNameTitle, list }) => {
  return (
    <div className={(styles.wrapper, className)}>
      {title && <p className={cn(styles.title, classNameTitle)}>{title}</p>}
      <ul className={styles.list}>
        {list.map((item) => (
          <li className={styles.item}>
            <Link className={styles.link} to={item.link} view='simple'>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
