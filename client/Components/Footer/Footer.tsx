import React, { FC, memo, HTMLAttributes, useCallback } from 'react';

import useMedias from '@Hooks/useMedias';
import FooterDesktop from './elems/FooterDesktop';
import FooterMobileM from './elems/FooterMobileM';
import FooterMobile from './elems/FooterMobile';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Footer: FC<FooterProps> = () => {
  const { isMobileM, isMobile } = useMedias();

  const renderFooter = useCallback(() => {
    if (isMobile) {
      return <FooterMobile />;
    }

    if (isMobileM) {
      return <FooterMobileM />;
    }

    return <FooterDesktop />;
  }, [isMobile, isMobileM]);

  return (
    <div className={styles.footer}>
      <div className={styles.row}>{renderFooter()}</div>
    </div>
  );
};

export default memo(Footer);
