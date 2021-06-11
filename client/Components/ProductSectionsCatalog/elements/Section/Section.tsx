import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import { ProductModel } from '@Types/Category';
import styles from './Section.module.css';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  section: ProductModel;
}

const Section: FC<SectionProps> = (props) => {
  const { className, section, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.Section, className)}>
      <div className={styles.head}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{section.name}</h2>
          {section.priceMin && (
            <div className={styles.priceMin}>
              {`от `}
              <Price price={section.priceMin} />
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default memo(Section);
