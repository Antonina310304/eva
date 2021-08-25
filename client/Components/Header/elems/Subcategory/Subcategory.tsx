import React, { FC, HTMLAttributes } from 'react';
import { IMainNav } from '@Types/MainNav';
import CategoryList from '@Components/Header/elems/CategoryList';
import Link from '@UI/Link';
import MobileNavContainer from '@Components/Header/elems/MobileNavContainer';
import styles from './Subcategory.module.css';

export interface SubcategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: IMainNav;
}

/**
 * изображение подкатегории, заголовок,
 * картинка, ссылка и список подкатегорий только для мобильной версии
 */
const Subcategory: FC<SubcategoryProps> = ({ category }) => {
  return (
    <div>
      <div className={styles.header}>
        <img src={category.img} alt={category.title} />
        <MobileNavContainer className={styles.titleBlock}>
          <>
            <p className={styles.title}>{category.title}</p>
            <Link view='simple' className={styles.link} to={category.link}>
              Смотреть все модели
            </Link>
          </>
        </MobileNavContainer>
      </div>
      <MobileNavContainer className={styles.inner}>
        <>
          {category.dropDown.map((categoryItem, index) => {
            return (
              <div key={index} className={styles.section}>
                <div className={styles.wrapper}>
                  <p className={styles.type}>{categoryItem.name}</p>
                  <Link className={styles.grayLink} view='grayString' to={categoryItem.link}>
                    Все кровати
                  </Link>
                </div>
                <CategoryList category={categoryItem} />
              </div>
            );
          })}
        </>
      </MobileNavContainer>
    </div>
  );
};

export default Subcategory;
