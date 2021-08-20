import React, { FC, HTMLAttributes, memo, ReactChild } from 'react';
import FooterTitleNav from '@Components/FooterTitileNav/FooterTitleNav';

import cn from 'classnames';
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
