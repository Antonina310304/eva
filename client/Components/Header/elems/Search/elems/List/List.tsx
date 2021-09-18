import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import { OfferSearchData } from '@Types/SearchResultData';
import styles from './List.module.css';

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  classNameTitle?: string;
  title?: string;
  list: OfferSearchData[];
}

const List: FC<ListProps> = ({ title, className, classNameTitle, list }) => {
  return (
    <div className={(styles.wrapper, className)}>
      {title && <p className={cn(styles.title, classNameTitle)}>{title}</p>}
      <ul className={styles.list}>
        {list.map((item) => (
          <li key={item.title} className={styles.item}>
            <Link className={styles.link} to={item.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;