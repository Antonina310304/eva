import React, { FC, HTMLAttributes, memo, ReactChild } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import styles from './Section.module.css';

export interface SectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string;
  title?: ReactChild;
  additional?: ReactChild | ReactChild[];
  additionalBreakup?: boolean;
  priceMin?: number;
  description?: ReactChild | ReactChild[];
}

const Section: FC<SectionProps> = (props) => {
  const {
    className,
    title,
    additional,
    additionalBreakup,
    priceMin,
    description,
    children,
    ...restProps
  } = props;

  return (
    <div
      {...restProps}
      className={cn(styles.section, { [styles.additionalBreakup]: additionalBreakup }, className)}
    >
      <div className={styles.head}>
        <div className={styles.headContent}>
          {typeof title === 'string' && <h2 className={styles.title}>{title}</h2>}
          {typeof title === 'object' && <div className={styles.title}>{title}</div>}

          {priceMin && (
            <div className={styles.priceMin}>
              {`от `}
              <Price price={priceMin} />
            </div>
          )}

          {description && <div className={styles.description}>{description}</div>}
        </div>

        {additional && <div className={styles.additional}>{additional}</div>}
      </div>

      <div className={styles.contentn}>{children}</div>
    </div>
  );
};

export default memo(Section);
