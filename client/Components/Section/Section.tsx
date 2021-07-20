import React, { FC, HTMLAttributes, memo, MouseEvent, ReactChild } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Arrows from './elements/Arrows';
import styles from './Section.module.css';

export interface SectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string;
  title: ReactChild;
  hasArrows?: boolean;
  priceMin?: number;
  description?: ReactChild | ReactChild[];
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

const Section: FC<SectionProps> = (props) => {
  const {
    className,
    title,
    hasArrows = true,
    priceMin,
    description,
    children,
    onPrev,
    onNext,
    ...restProps
  } = props;

  return (
    <div {...restProps} className={cn(styles.Section, className)}>
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

        {hasArrows && (
          <div className={styles.arrows}>
            <Arrows onPrev={onPrev} onNext={onNext} />
          </div>
        )}
      </div>

      <div className={styles.contentn}>{children}</div>
    </div>
  );
};

export default memo(Section);
