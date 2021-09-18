import { FC, MouseEvent } from 'react';
import cn from 'classnames';

import { InstallmentVariant } from '@Types/InstallmentBank';
import styles from './Variants.module.css';

export interface VariantsProps {
  className?: string;
  selectedVariant: InstallmentVariant;
  variants: InstallmentVariant[];
  color: string;
  onChange?: (e: MouseEvent, variant: InstallmentVariant) => void;
}

const Variants: FC<VariantsProps> = (props) => {
  const { className, selectedVariant, variants, color, onChange, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.variants, className)}>
      {variants.map((variant) => {
        return (
          <div key={variant.name} className={styles.variant} onClick={(e) => onChange(e, variant)}>
            <div className={cn(styles.radio, { [styles.selected]: selectedVariant === variant })} />
            <div className={styles.name}>{variant.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Variants;
