import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ServicePageParagraphTitle.module.css';

export interface ServicePageParagraphTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const ServicePageParagraphTitle: FC<ServicePageParagraphTitleProps> = (props) => {
  const { className, title, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.paragraphTitle, className)}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default memo(ServicePageParagraphTitle);
