import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import FeatureItem from '../FeatureItem';

import styles from './ProductFeatures.module.css';

export interface Features {
  description: string;
  fileVideo: string;
  image: string;
  name: string;
  youtubeVideo: string;
}
export interface ProductFeaturesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  features: Features[];
}

const ProductFeatures: FC<ProductFeaturesProps> = (props) => {
  const { className, features, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, [className])}>
      {features.map((feature, index) => (
        <FeatureItem feature={feature} key={index} />
      ))}
    </div>
  );
};

export default memo(ProductFeatures);
