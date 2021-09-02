import React, { memo } from 'react';
import cn from 'classnames';

import styles from './CharacteristicsList.module.css';

const CharacteristicsList = (props) => {
  const { className, characteristics, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.characteristicsList, className)}>
      {characteristics.map((characteristic, index) => (
        <div className={styles.item} key={index}>
          <div>{`${characteristic.name} ${characteristic.value}`}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(CharacteristicsList);
