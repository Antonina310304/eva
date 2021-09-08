import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import SectionTitle from '@Components/SectionTitle';
import styles from './Popular.module.css';

export interface PopularProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}
const Popular: FC<PopularProps> = ({ className, title }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <SectionTitle title={title} />
      <p>слайдер</p>
    </div>
  );
};

export default Popular;
