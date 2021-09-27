import React, { FC, HTMLAttributes, memo } from 'react';
import Image from '@UI/Image';

import styles from './FeatureItem.module.css';

interface Feature {
  description: string;
  image: string;
  name: string;
}

export interface FeatureItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  feature: Feature;
}

const FeatureItem: FC<FeatureItemProps> = ({ feature }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{feature.name}</div>
        <div className={styles.description}>{feature.description}</div>
      </div>
      <div className={styles.imgWrapper}>
        <Image className={styles.img} src={feature.image} />
      </div>
    </div>
  );
};

export default memo(FeatureItem);
