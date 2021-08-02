import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import useModals from '@Hooks/useModals';
import useMeta from '@Queries/useMeta';
import styles from './Region.module.css';

export interface RegionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Region: FC<RegionProps> = (props) => {
  const { className, ...restProps } = props;
  const meta = useMeta({ ssr: true });
  const [, { openModal }] = useModals();

  const handleClickRegion = useCallback(
    (e) => {
      e.preventDefault();

      openModal('Info', {
        title: 'Упс!',
        text: 'Ещё не готово, заходите позже…',
      });
    },
    [openModal],
  );

  if (!meta.isSuccess) return null;

  return (
    <div {...restProps} className={cn(styles.region, className)} onClick={handleClickRegion}>
      <div className={styles.icon} />
      <div className={styles.label}>{meta.data.region.name}</div>
    </div>
  );
};

export default memo(Region);
