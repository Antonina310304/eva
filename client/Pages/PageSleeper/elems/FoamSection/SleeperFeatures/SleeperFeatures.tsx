import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import FeatureItem from '@Pages/PageSleeper/elems/FoamSection/SleeperFeatures/elems/FeatureItem/FeatureItem';
import styles from './SleeperFeatures.module.css';

interface Features {
  description: string;
  image: string;
  name: string;
}

export interface SleeperFeaturesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  features: Features[];
}

const ProductFeatures: FC<SleeperFeaturesProps> = (props) => {
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
