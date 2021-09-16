import React, { memo, FC } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import Image from '@UI/Image';
import { CategoryData } from '@Pages/PageSiteMap/typings';
import styles from './SiteMapSection.module.css';

interface SiteMapSectionProps {
  className?: string;
  name: string;
  subcategories: CategoryData[];
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
