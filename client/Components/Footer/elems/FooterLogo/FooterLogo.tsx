import React, { FC, HTMLAttributes, memo } from 'react';

import styles from './FooterLogo.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FooterLogo: FC<FooterProps> = () => {
  return (
    <div className={styles.footerLogo}>
      <img src='react/static/img/FooterLogo.svg' alt='Логотип подвала' />
    </div>
  );
};

export default memo(FooterLogo);
