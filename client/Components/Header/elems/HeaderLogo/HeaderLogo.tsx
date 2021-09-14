import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Slider from '../Slider';
import styles from './HeaderLogo.module.css';

export interface IHeaderLogo extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HeaderLogo: FC<IHeaderLogo> = ({ className }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <Slider />
      <div className={styles.icon}>
        <img src='/react/static/img/topSlider/icon.svg' alt='' />
      </div>
    </div>
  );
};

export default memo(HeaderLogo);
