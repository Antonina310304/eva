import React, { FC, HTMLAttributes, memo, ReactChild, useState } from 'react';
import cn from 'classnames';
import useMediaQuery from '@Hooks/useMediaQuery';
import styles from './Accordion.module.css';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  header: string | ReactChild;
  collapsed?: boolean;
  children?: ReactChild;
  disabled?: boolean;
}

const Accordion: FC<AccordionProps> = ({ header, children, collapsed, disabled = false }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed);
  const isMobile = useMediaQuery('(max-width: 639px)');

  function toggleAccordion() {
    if (!isMobile || disabled) {
      return;
    }
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={cn(styles.accordion, {
        [styles.disabled]: disabled === true,
        [styles.collapsed]: isCollapsed === true,
      })}
    >
      <div className={cn(styles.accordionHeader)} onClick={toggleAccordion}>
        {header}
      </div>

      <div className={styles.accordionBody}>
        <div className={styles.accordionBodyIn}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Accordion);
