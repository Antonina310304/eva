import React, { FC, memo } from 'react';
import styles from './FoamSection.module.css';

const FoamSection: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topBlock}>Три слоя инновационной пены для безупречного комфорта</div>
      <div className={styles.bottomBlock}>пена с эффектом памяти и удобный съемный чехол</div>
    </div>
  );
};

export default memo(FoamSection);
