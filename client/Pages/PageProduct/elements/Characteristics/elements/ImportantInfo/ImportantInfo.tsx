import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ImportantInfo.module.css';

export interface ImportantInfoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  text: string;
}

const ImportantInfo: FC<ImportantInfoProps> = (props) => {
  const { className, title, text, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.importantInfo, className)}>
      <span className={styles.title}>{`${title} `}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default memo(ImportantInfo);
