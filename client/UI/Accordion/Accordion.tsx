import React, { FC, HTMLAttributes, memo, ReactChild, useState, useCallback } from 'react';
import cn from 'classnames';

import Collapse from '@UI/Collapse';
import useMedias from '@Hooks/useMedias';
import styles from './Accordion.module.css';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  header: string | ReactChild;
  defaultCollapsed?: boolean;
  children?: ReactChild;
  disabled?: boolean;
}

const Accordion: FC<AccordionProps> = (props) => {
  const { header, children, defaultCollapsed, disabled } = props;
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
  const { isMobile } = useMedias();

  const handleClickHeader = useCallback(() => {
    if (!isMobile || disabled) {
      return;
    }

    setCollapsed(!collapsed);
  }, [disabled, collapsed, isMobile]);

  return (
    <div
      className={cn(styles.accordion, {
        [styles.disabled]: disabled === true,
        [styles.collapsed]: collapsed === true,
      })}
    >
      <div className={cn(styles.header)} onClick={handleClickHeader}>
        {header}
      </div>

      {isMobile ? (
        <Collapse collapsed={collapsed}>
          <div className={styles.content}>{children}</div>
        </Collapse>
      ) : (
        <div className={styles.content}>{children}</div>
      )}
    </div>
  );
};

export default memo(Accordion);
