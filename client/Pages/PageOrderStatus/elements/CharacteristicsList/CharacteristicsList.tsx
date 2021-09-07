import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './CharacteristicsList.module.css';

export interface CharacteristicData {
  title: string;
  value: string;
}

export interface CharacteristicsListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  characteristics: CharacteristicData[];
}

const CharacteristicsList: FC<CharacteristicsListProps> = (props) => {
  const { className, characteristics, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.characteristicsList, className)}>
      {characteristics.map((characteristic, index) => (
        <div className={styles.item} key={index}>
          <div>{`${characteristic.title} ${characteristic.value}`}</div>
        </div>
      ))}
    </div>
  );
};

export default memo(CharacteristicsList);
