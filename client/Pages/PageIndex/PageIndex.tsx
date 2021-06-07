import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@divanru/ts-ui/Button';

import useModals from '@Hooks/useModals';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClick = useCallback(() => {
    openModal('Info', {
      title: 'Hello, World!',
      text: 'I`m simple information modal window',
    });
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <Button onClick={handleClick}>Open modal</Button>
    </div>
  );
};

export default memo(PageIndex);
