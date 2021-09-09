import React, { FC, HTMLAttributes, memo } from 'react';

import Link from '@UI/Link';
import logoSrc from './FooterLogo.svg';
import styles from './FooterLogo.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FooterLogo: FC<FooterProps> = () => {
  return (
    <Link className={styles.footerLogo} to='/'>
      <img src={logoSrc} alt='Логотип divan.ru' />
    </Link>
  );
};

export default memo(FooterLogo);
