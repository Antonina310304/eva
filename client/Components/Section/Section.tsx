import React, { FC, HTMLAttributes, memo, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Arrows from './elements/Arrows';
import styles from './Section.module.css';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  hasArrows?: boolean;
  priceMin?: number;
  onPrev?: (e: MouseEvent) => void;
  onNext?: (e: MouseEvent) => void;
}

const Section: FC<SectionProps> = (props) => {
  const {
    className,
    title,
    hasArrows = true,
    priceMin,
    children,
    onPrev,
    onNext,
    ...restProps
  } = props;

  const handlePrev = useCallback(
    (e) => {
      if (onPrev) onPrev(e);
    },
    [onPrev],
  );

  const handleNext = useCallback(
    (e) => {
      if (onNext) onNext(e);
    },
    [onNext],
  );

  return (
    <div {...restProps} className={cn(styles.Section, className)}>
      <div className={styles.head}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>{title}</h2>
          {priceMin && (
            <div className={styles.priceMin}>
              {`от `}
              <Price price={priceMin} />
            </div>
          )}
        </div>

        {hasArrows && (
          <div className={styles.arrows}>
            <Arrows onPrev={handlePrev} onNext={handleNext} />
          </div>
        )}
      </div>

      <div className={styles.contentn}>{children}</div>
    </div>
  );
};

export default memo(Section);
