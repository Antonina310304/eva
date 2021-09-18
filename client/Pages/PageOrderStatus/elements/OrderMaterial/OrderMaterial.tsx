import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './OrderMaterial.module.css';

export interface ProductMaterialData {
  image: string;
  title: string;
  name: string;
  description: string;
}

export interface OrderMaterialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  material: ProductMaterialData;
}

const OrderMaterial: FC<OrderMaterialProps> = (props) => {
  const { className, material, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.orderMaterial, className)}>
      <Image className={styles.color} src={material.image} />
      <div className={styles.par}>
        {`${material.title} ${material.name} ${material.description}`}
      </div>
    </div>
  );
};

export default memo(OrderMaterial);
