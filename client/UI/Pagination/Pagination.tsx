import React, { FC, HTMLAttributes } from 'react';

import cn from 'classnames';
import styles from './Pagination.module.css';

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  elementCount: number;
  activeElementNumber: number;
  goToSlide: (arg: number) => void;
}

const Pagination: FC<PaginationProps> = ({ elementCount, activeElementNumber, goToSlide }) => {
  return (
    <div>
      <ul className={styles.pagination}>
        {new Array(elementCount).fill('').map((item, index) => (
          <li
            className={cn(
              { [styles.active]: activeElementNumber === index },
              styles.paginationItem,
            )}
            key={index}
            onClick={() => goToSlide(index)}
          >
            {index}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
