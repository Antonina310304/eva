import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickButton = useCallback(() => {
    openModal('RegionSelector');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <div className={styles.title}>EVA / PageIndex</div>

      <Button onClick={handleClickButton}>Change region</Button>
    </div>
  );
};

export default memo(PageIndex);
