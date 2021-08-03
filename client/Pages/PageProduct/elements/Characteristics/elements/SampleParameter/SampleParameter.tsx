import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './SampleParameter.module.css';

export interface SampleParameterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  title: string;
  image: string;
}

const SampleParameter: FC<SampleParameterProps> = (props) => {
  const { className, name, title, image, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.parameter, className)}>
      <span className={styles.name}>{`${name}:`}</span>
      <Image className={styles.image} src={image} />
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default memo(SampleParameter);
