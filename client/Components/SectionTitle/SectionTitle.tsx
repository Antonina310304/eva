import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './SectionTitle.module.css';

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}
const SectionTitle: FC<SectionTitleProps> = ({ className, title }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default memo(SectionTitle);
