import React, { HTMLAttributes } from 'react';
import styles from './CategoryCard.module.css';

interface CategoryCardInterface extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardInterface> = ({ imageUrl, title, description }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={imageUrl} alt='' />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default React.memo(CategoryCard);
