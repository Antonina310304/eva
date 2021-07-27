import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import FeatureItem from '../FeatureItem';

import styles from './ProductFeatures.module.css';

export interface ProductFeaturesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  features: any;
}

const ProductFeatures: FC<ProductFeaturesProps> = (props) => {
  const { className, features, ...restProps } = props;

  return (
    <div {...restProps} className={cn({}, className)}>
      {features.map((feature, index) => (
        <div key={index}>
          <FeatureItem feature={feature} />
        </div>
      ))}
    </div>
  );
};

export default memo(ProductFeatures);
