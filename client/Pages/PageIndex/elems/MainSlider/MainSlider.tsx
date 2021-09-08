import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './MainSlider.module.css';

export interface MainSliderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const MainSlider: FC<MainSliderProps> = ({ title, className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Слайдер'}</p>
    </div>
  );
};

export default memo(MainSlider);
