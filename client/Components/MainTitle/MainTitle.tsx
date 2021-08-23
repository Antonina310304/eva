import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './MainTitle.module.css';

export interface MainTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const MainTitle: FC<MainTitleProps> = ({ className, title }) => {
  return <h1 className={cn(className, styles.title)}>{title}</h1>;
};

export default memo(MainTitle);
