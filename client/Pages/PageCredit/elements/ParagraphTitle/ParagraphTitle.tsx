import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ParagraphTitle.module.css';

export interface ParagraphTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
}

const ParagraphTitle: FC<ParagraphTitleProps> = (props) => {
  const { className, title, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.paragraphTitle, className)}>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default memo(ParagraphTitle);
