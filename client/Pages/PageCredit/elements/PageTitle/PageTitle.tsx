import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PageTitle.module.css';

export interface PageTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  view?: string;
}

const PageTitle: FC<PageTitleProps> = (props) => {
  const { className, title, view, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageTitle, className)}>
      <div className={cn(styles.title, { [styles.bordered]: view === 'bordered' })}>{title}</div>
    </div>
  );
};

export default memo(PageTitle);
