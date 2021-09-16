import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ServicePageTitle.module.css';

export interface ServicePageTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  view?: string;
}

const ServicePageTitle: FC<ServicePageTitleProps> = (props) => {
  const { className, title, view, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageTitle, className)}>
      <h1 className={cn(styles.title, { [styles.bordered]: view === 'bordered' })}>{title}</h1>
    </div>
  );
};

export default memo(ServicePageTitle);
