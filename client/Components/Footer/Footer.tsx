import React, { FC, memo, HTMLAttributes, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import useMedias from '@Hooks/useMedias';
import useLayout from '@Queries/useLayout';
import FooterDesktop from './elems/FooterDesktop';
import FooterMobileM from './elems/FooterMobileM';
import FooterMobile from './elems/FooterMobile';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Footer: FC<FooterProps> = () => {
  const { isMobileM, isMobile } = useMedias();
  const { pathname } = useLocation();
  const layout = useLayout({ path: pathname, ssr: true });
  const footer = layout.isSuccess ? layout.data.footer : null;

  const renderContent = useCallback(() => {
    if (!footer) return null;

    if (isMobile) {
      return <FooterMobile />;
    }

    if (isMobileM) {
      return <FooterMobileM />;
    }

    return <FooterDesktop footer={footer} />;
  }, [footer, isMobile, isMobileM]);

  if (!footer) return null;

  return (
    <div className={styles.footer}>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default memo(Footer);
