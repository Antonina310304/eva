import { FC, HTMLAttributes, memo, ReactChild } from 'react';
import cn from 'classnames';

import styles from './FooterInfoBlock.module.css';

export interface FooterInfoBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  children?: ReactChild;
}

const FooterInfoBlock: FC<FooterInfoBlockProps> = (props) => {
  const { title, children, className } = props;

  return (
    <div className={cn(styles.footerInfoBlock, className)}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
      </div>

      {children}
    </div>
  );
};

export default memo(FooterInfoBlock);
