import React, { FC, memo } from 'react';
import Image from '@UI/Image';
import styles from './BottomBanner.module.css';

const imgUrl = 'react/static/img/sleeper/bottomBanner/img.png';

const BottomBanner: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <Image className={styles.img} src={imgUrl} />
      </div>
    </div>
  );
};

export default memo(BottomBanner);
