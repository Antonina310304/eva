import React, { memo, FC } from 'react';
import cn from 'classnames';

import { SubcategoryData } from '@Types/Category';
import Link from '@UI/Link';
import Image from '@UI/Image';
import styles from './SiteMapSection.module.css';

interface SiteMapSectionProps {
  className?: string;
  name: string;
  subcategories: SubcategoryData[];
}

const SiteMapSection: FC<SiteMapSectionProps> = (props) => {
  const { className, name, subcategories, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.section, className)}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.list}>
        {subcategories.map((subcategory, index) => (
          <div className={styles.subcategory} key={index}>
            <Link className={styles.link} to={subcategory.url}>
              <Image
                src={subcategory.icon}
                className={styles.subcategoryIcon}
                style={{ width: subcategory.width, height: subcategory.height }}
              />
              <div className={styles.subcategoryTitle}>{subcategory.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(SiteMapSection);
