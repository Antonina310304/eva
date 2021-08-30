import React, { FC, memo, HTMLAttributes } from 'react';

import FooterTop from '@Components/Footer/elems/FooterTop';

import Container from '@Components/Container';
import useMediaQuery from '@Hooks/useMediaQuery';

import FooterDesktop from '@Components/Footer/elems/FooterDesktop';
import FooterMobileM from '@Components/Footer/elems/footerMobileM';
import FooterMobile from '@Components/Footer/elems/FooterMobile';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Footer: FC<FooterProps> = () => {
  const mediaQuery = {
    isDesktop: useMediaQuery('`(min-width: 1279px)`'),
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
      <Container>
        <div className={styles.row}>{renderColumns()}</div>
      </Container>
    </div>
  );
};

export default memo(Footer);
