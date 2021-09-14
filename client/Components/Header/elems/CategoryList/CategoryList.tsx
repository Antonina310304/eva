import React, { FC, HTMLAttributes } from 'react';
import { IMainNavSubmenu } from '@Types/MainNav';
import Link from '@UI/Link';
import Boldik from '@UI/Boldik';
import styles from './CategoryList.module.css';

export interface CategoryListProps extends HTMLAttributes<HTMLDivElement> {
  category: IMainNavSubmenu;
}

const CategoryList: FC<CategoryListProps> = ({ category }) => {
  return (
    <ul className={styles.list}>
      {category.items.map((item) => (
        <li className={styles.item} key={item.title}>
          <Link className={styles.link} to={item.link}>
            <Boldik>{item.title}</Boldik>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
