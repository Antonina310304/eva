import React, { memo } from 'react';
import cn from 'classnames';

import styles from './CharactericsList.module.css';

const CharactericsList = (props) => {
  const { className, characteristics, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.charactericsList, className)}>
      {characteristics.map((characteristic, index) => (
        <div className={styles.item} key={index}>
          <div className={styles.itemName}>{characteristic.name}</div>
          <div className={styles.itemValue}>{characteristic.value}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(CharactericsList);
