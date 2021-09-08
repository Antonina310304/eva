import React, { FC, HTMLAttributes, memo, ReactChild } from 'react';
import cn from 'classnames';

import FooterTitleNav from '../FooterTitileNav';
import styles from './FooterInfoBlock.module.css';

export interface FooterInfoBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  children?: ReactChild;
}

const FooterInfoBlock: FC<FooterInfoBlockProps> = ({ title, children, className }) => {
  return (
    <div className={cn(styles.footerInfoBlock, className)}>
      <div className={styles.FooterInfoBlockHeader}>
        <FooterTitleNav title={title} />
      </div>
      {children}
    </div>
  );
};

export default memo(FooterInfoBlock);
