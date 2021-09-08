import React, { FC, memo, HTMLAttributes } from 'react';

import useMediaQuery from '@Hooks/useMediaQuery';
import FooterTop from './elems/FooterTop';
import FooterDesktop from './elems/FooterDesktop';
import FooterMobileM from './elems/footerMobileM';
import FooterMobile from './elems/FooterMobile';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Footer: FC<FooterProps> = () => {
  const mediaQuery = {
    isDesktop: useMediaQuery('(min-width: 1279px)'),
    isMobileM: useMediaQuery('(min-width: 768px) and (max-width: 1278px)'),
    isMobile: useMediaQuery('(max-width: 767px)'),
  };

  function renderColumns() {
    if (mediaQuery.isMobile) {
      return <FooterMobile />;
    }
    if (mediaQuery.isMobileM) {
      return <FooterMobileM />;
    }
    if (mediaQuery.isDesktop) {
      return <FooterDesktop />;
    }
    return false;
  }

  return (
    <div className={styles.footer}>
      <FooterTop />
      <div className={styles.container}>
        <div className={styles.row}>{renderColumns()}</div>
      </div>
    </div>
  );
};

export default memo(Footer);
