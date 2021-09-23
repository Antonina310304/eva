import React from 'react';
import styles from './BottomBanner.module.css';

const imgUrl = 'react/static/img/sleeper/bottomBanner/img.png';

const BottomBanner = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={imgUrl} />
    </div>
  );
};

export default React.memo(BottomBanner);
