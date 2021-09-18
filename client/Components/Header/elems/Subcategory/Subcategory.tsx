import { FC, HTMLAttributes } from 'react';

import { IMainNav } from '@Types/MainNav';
import Link from '@UI/Link';
import Scroller from '@UI/Scroller';
import MobileNavContainer from '../MobileNavContainer';
import CategoryList from '../CategoryList';
import styles from './Subcategory.module.css';

export interface SubcategoryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: IMainNav;
}

const Subcategory: FC<SubcategoryProps> = ({ category }) => {
  return (
    <div className={styles.subcategory}>
      <div className={styles.header}>
        <img src={category.img} alt={category.title} />
        <MobileNavContainer className={styles.titleBlock}>
          <>
            <p className={styles.title}>{category.title}</p>
            <Link className={styles.link} to={category.link}>
              Смотреть все модели
            </Link>
          </>
        </MobileNavContainer>
      </div>
      <MobileNavContainer className={styles.inner}>
        <Scroller className={styles.scroller}>
          <div className={styles.scrollerInner}>
            {category.dropDown.map((categoryItem) => {
              return (
                <div key={categoryItem.name} className={styles.section}>
                  <div className={styles.wrapper}>
                    <p className={styles.type}>{categoryItem.name}</p>
                    <Link to={categoryItem.link}>{categoryItem.textLink}</Link>
                  </div>
                  <CategoryList category={categoryItem} />
                </div>
              );
            })}
          </div>
        </Scroller>
      </MobileNavContainer>
    </div>
  );
};

export default Subcategory;
