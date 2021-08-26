import React, { FC, InputHTMLAttributes, Suspense, memo, useState, useCallback, lazy } from 'react';
import cn from 'classnames';

import Switch from '@UI/Switch';
import useOnClickOutside from '@Hooks/useOnClickOutside';

import styles from './SwitchBonuses.module.css';

export interface SwitchBonusesProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const InfoPopup = lazy(() => import('./elems/InfoPopup'));

const SwitchBonuses: FC<SwitchBonusesProps> = (props) => {
  const { className, checked, name, onChange, ...restProps } = props;
  const [loadedPopup, setLoadedPopup] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);

  const handleClickInfo = useCallback(() => {
    setLoadedPopup(true);
    setVisiblePopup((prev) => !prev);
  }, []);

  const handleClosePopup = useCallback(() => {
    setVisiblePopup(false);
  }, []);

  const refPopup = useOnClickOutside(handleClosePopup, !visiblePopup);

  return (
    <div {...restProps} className={cn(styles.switcher, className)}>
      <Switch className={styles.switch} name={name} checked={checked} onChange={onChange} />
      <div className={styles.content}>
        Хочу начислять и списывать бонусы
        <div className={styles.wrapperIcon}>
          <div className={styles.icon} onClick={handleClickInfo} />

          <Suspense fallback={null}>
            {loadedPopup && <InfoPopup visible={visiblePopup} ref={refPopup} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default memo(SwitchBonuses);
