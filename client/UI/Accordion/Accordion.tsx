import React, { FC, HTMLAttributes, memo, ReactChild, useState } from 'react';

import FooterTitleNav from '@Components/FooterTitileNav';
import cn from 'classnames';
import useMedias from '@Hooks/useMedias';
import styles from './Accordion.module.css';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  collapsed?: boolean;
  children?: ReactChild;
}

const Accordion: FC<AccordionProps> = ({ title, children, collapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed);
  const isMobile = useMedias().isMobileS;

  function toggleAccordion() {
    if (!isMobile) {
      return;
    }
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className={cn(styles.accordion, isCollapsed ? styles.collapsed : '')}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <FooterTitleNav title={title} />
      </div>
      <div className={styles.accordionBody}>
        <div className={styles.accordionBodyIn}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Accordion);
