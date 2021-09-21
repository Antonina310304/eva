import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import CrossSaleSection from '@Components/CrossSaleSection';
import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import styles from './CrossSales.module.css';

export interface CrossSalesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sections: any[];
}

const CrossSales: FC<CrossSalesProps> = (props) => {
  const { className, sections, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.crossSales, className)}>
      {sections.map((section, index) => (
        <CrossSaleSection
          key={index}
          className={styles.section}
          title={section.name}
          products={section.products}
          renderItem={(productCardProps) => (
            <div className={styles.productItem}>
              <CrossSaleProductCard {...productCardProps} />
            </div>
          )}
        />
      ))}
    </div>
  );
};

export default memo(CrossSales);
