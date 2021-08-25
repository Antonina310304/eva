import React, { FC, HTMLAttributes } from 'react';
import { IMainNavSubmenu } from '@Types/MainNav';
import Link from '@UI/Link';
import styles from './CategoryList.module.css';

export interface CategoryListProps extends HTMLAttributes<HTMLDivElement> {
  category: IMainNavSubmenu;
}

// TODO Удалить key index
const CategoryList: FC<CategoryListProps> = ({ category }) => {
  return (
    <ul className={styles.list}>
      {category.items.map((item, index) => (
        <li className={styles.item} key={index}>
          <Link view='nav' to={item.link}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
